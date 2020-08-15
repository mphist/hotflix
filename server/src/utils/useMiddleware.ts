import express from "express";

export const useMiddleware = (app: express.Express) => {
  // Parse URL-encoded bodies (as sent by HTML forms)
  app.use(express.urlencoded({ extended: true }));

  // Parse JSON bodies (as sent by API clients)
  app.use(express.json());

  // CORS for client
  const origin =
    process.env.NODE_ENV === "production"
      ? process.env.FRONTEND_HOST_PROD
      : process.env.FRONTEND_HOST_DEV;
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", origin); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    next();
  });
};
