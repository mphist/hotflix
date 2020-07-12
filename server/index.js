import express from "express";
import { ApolloServer, gql } from "apollo-server-express";
import {
  discover,
  trending,
  search,
  tv,
  movies,
  animation,
  new_movies,
  tv_genre,
} from "./api";

// poster_path https://image.tmdb.org/t/p/w500/

// construct GraphQL schema
const typeDefs = gql`
  type Results {
    poster_path: String
    id: Int
    backdrop_path: String
    title: String
    overview: String
    release_date: String
    vote_average: Float
    original_name: String
    original_title: String
  }

  type Query {
    discover(id: Int): [Results]
    trending: [Results]
    tv: [Results]
    movies: [Results]
    new_trending: [Results]
    new_movies: [Results]
    new_tv: [Results]
    tv_genre(id: Int): [Results]
  }

  type Mutation {
    search(query: String!): [Results]
  }
`;

const fetch = async (api, query) => {
  if (query !== undefined) {
    const response = await api(query);
    return response.results;
  }
  const response = await api();
  return response.results;
};

// construct resolvers for the schema fields
const resolvers = {
  Query: {
    discover: (_, { id }) => fetch(discover, id),
    trending: () => fetch(trending),
    tv: () => fetch(tv),
    movies: () => fetch(movies),
    new_movies: () => fetch(new_movies),
    tv_genre: (_, { id }) => fetch(tv_genre, id),
  },
  Mutation: {
    search: (_, { query }) => fetch(search, query),
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

const app = express();

server.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

// CORS
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/", (req, res) => {
  console.log(req.body);
  res.status(200).send("success");
});

app.post("/login", (req, res) => {
  console.log(req.body);
  res.status(200).send("success");
});

//server.listen().then(({ url }) => console.log(`Server ready at ${url}`));
