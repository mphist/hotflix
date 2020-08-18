import "reflect-metadata";
import express from "express";
import Redis from "ioredis";
import { User } from "./entity/User";
import request from "graphql-request";
import session from "express-session";
import connectRedis from "connect-redis";
import axios from "axios";
import { getSchemasAndResolvers } from "./modules";
import { startSession } from "./session";
import { startServer } from "./utils/startApolloServer";
import { useMiddleware } from "./utils/useMiddleware";

process.env.NODE_ENV === "production"
  ? require("dotenv").config({ path: "/hotflix/server/.env" })
  : require("dotenv").config();

// poster_path https://image.tmdb.org/t/p/w500/

// import GraphQL schemas and resolvers
const schemas = getSchemasAndResolvers();

const app = express();

// Session. Must be placed before server.applyMiddleware. Otherwise, req.session == undefined in resolvers
const RedisStore = connectRedis(session);
const redisConfig =
  process.env.NODE_ENV === "production" ? process.env.REDIS_URL : {};
const redis = new Redis(redisConfig);
//startSession(app, redis, RedisStore);

app.set("trust proxy", 1);
app.use(
  session({
    store: new RedisStore({ client: redis }),
    name: "sid",
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 1000 * 60 * 60 * 24, // a day
      sameSite: process.env.NODE === "production" ? "none" : "lax", // required by Chrome for CORS
    },
  })
);
// start Apollo GraphQL server and establish TypeORM connection
startServer(app, schemas);

// call middleware
useMiddleware(app);

const host =
  process.env.NODE_ENV === "production"
    ? process.env.GRAPHQL_HOST_PROD
    : process.env.GRAPHQL_HOST_DEV;

app.get("/", (req, res) => {
  console.log("session", req.session);
  if (req.session.userId) {
    return res
      .status(200)
      .send({ login: true, id: req.session.userId, email: req.session.email });
  }
  return res.status(200).send({ login: false });
});

app.get("/confirm/:id", async (req, res) => {
  const { id } = req.params;
  //const redis = new Redis();
  const userId = await redis.get(id);
  if (userId) {
    await User.update({ id: userId }, { confirmed: true });
    await redis.del(id);
    res.send("ok");
  } else {
    res.send("invalid user id");
  }
});

app.post("/register", async (req, res) => {
  //query db with graphql to register user
  const mutation = (
    email: string | null,
    phone: string | null,
    password: string
  ) => `
  mutation {
      register(email: "${email}", phone: "${phone}" password: "${password}") {
        path
        error
        confirmationEmail
      }
  }
  `;
  const { email, phone, password1 } = req.body;
  const response = await request(host, mutation(email, phone, password1));
  if (response) {
    //console.log(response.register[0]);
    const host =
      process.env.NODE_ENV === "production"
        ? process.env.BACKEND_HOST_PROD + "/login"
        : process.env.BACKEND_HOST_DEV + "/login";
    const response2 = await axios.post(host, {
      email,
      phone,
      password: password1,
    });
    const { redirectUrl } = response2.data;
    if (redirectUrl) {
      res.status(200).send({ redirectUrl, email: response2.data.email });
    }
  }
  return res.status(400).send(response.register[0]);
});

app.post("/check_email", async (req, res) => {
  const { email } = req.body;
  const userAlreadyExists = await User.findOne({ where: { email } });
  if (userAlreadyExists) {
    res.send("email already taken");
  }
  res.send("email is good to use");
});

app.post("/login", async (req, res) => {
  //query db with graphql to compare with login entered
  const mutation = (
    email: string | null,
    phone: string | null,
    password: string
  ) =>
    `mutation {
        login(email: "${email}", phone: "${phone}" password: "${password}") {
            path
            error
            userId
        }
    }
    `;

  const { email, phone, password } = req.body;
  const response = await axios.post(
    host,
    { query: mutation(email, phone, password) },
    { withCredentials: true }
  );
  const userId = response.data.data.login[0].userId;

  if (userId) {
    // login successful
    req.session.userId = userId;
    req.session.email = email;
    console.log("session after login", req.session);
    //res.redirect("http://localhost:3000/browse"); // cors issue
    return res.send({
      redirectUrl:
        process.env.NODE_ENV === "production"
          ? process.env.FRONTEND_HOST_PROD + "/browse"
          : process.env.FRONTEND_HOST_DEV + "/browse",
      id: userId,
      email,
    });
  }
  return res.status(200).send("login failed");
});

app.get("/logout", (req, res) => {
  if (req.session) {
    req.session.destroy((err) => {
      if (err) {
        console.log("Logout error", err);
      }
      const redirectUrl =
        process.env.NODE_ENV === "production"
          ? process.env.FRONTEND_HOST_PROD
          : process.env.FRONTEND_HOST_DEV;
      res.redirect(redirectUrl);
    });
  }
});

app.post("/add_to_mylist", async (req, res) => {
  const { email, id, title } = req.body;
  const mutation = (
    email: string,
    show_id: number,
    show_title: string
  ) => `mutation {
   add_to_mylist(email: "${email}", show_id: ${show_id}, show_title: "${show_title}") {
     message
   }
 }`;
  const response = await axios.post(
    host,
    { query: mutation(email, id, title) },
    { withCredentials: true }
  );
  res.status(200).send(response.data);
});

app.post("/get_mylist", async (req, res) => {
  const { email } = req.body;
  console.log("email", email);
  const query = (email: string) => `{
    get_mylist(email: "test@test.test") {
      id
      title
      poster_path
      original_name
      original_title
    }
  }`;

  try {
    const response = await axios.post(
      host,
      {
        query: query(email),
      },
      { withCredentials: true }
    );
    res.status(200).send(response.data.data.get_mylist);
  } catch (err) {
    console.log("Error fetching get_mylist", err);
  }
});
