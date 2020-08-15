import { GraphQLSchema } from "graphql";
import { mergeSchemas } from "graphql-tools";
import { ApolloServer } from "apollo-server-express";
import express from "express";
import { createTypeOrmConn } from "./createTypeOrmConn";

export const startServer = async (
  app: express.Express,
  schemas: GraphQLSchema[]
) => {
  const schema = mergeSchemas({ schemas });
  const server =
    process.env.NODE_ENV === "production"
      ? new ApolloServer({
          schema,
          introspection: true,
          playground: true,
          context: ({ req }) => ({
            url: req.protocol + "://" + req.get("host"),
            session: req.session,
          }),
        })
      : new ApolloServer({
          schema,
          context: ({ req }) => ({
            url: req.protocol + "://" + req.get("host"),
            session: req.session,
          }),
        });

  // CORS for GraphQL
  const cors = {
    origin: "*",
    credentials: true, // enable set cookie
  };

  server.applyMiddleware({ app, cors });

  console.log("PORT", process.env.PORT);

  await createTypeOrmConn();
  app.listen(process.env.PORT || 4000, () =>
    console.log(
      `🚀 Server ready at ${process.env.PORT || 4000}${server.graphqlPath}`
    )
  );
};
