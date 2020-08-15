import express from "express";
import { Redis } from "ioredis";
import { RedisStore } from "connect-redis";
import session from "express-session";

export const startSession = (
  app: express.Express,
  redis: Redis,
  RedisStore: RedisStore
) => {
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
      },
    })
  );
};
