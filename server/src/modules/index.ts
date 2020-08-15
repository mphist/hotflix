import fs from "fs";
import path from "path";
import { GraphQLSchema } from "graphql";
import { makeExecutableSchema } from "graphql-tools";

export const getSchemasAndResolvers = () => {
  const directories = fs.readdirSync(path.join(__dirname));
  //folders.pop(); // exclude ./modules/index.ts
  const folders = directories.slice(0, 2);
  const schemas: GraphQLSchema[] = [];
  folders.forEach((folder) => {
    const { typeDefs } = require(`./${folder}/typeDefs`);
    const { resolvers } = require(`./${folder}/resolvers`);
    schemas.push(makeExecutableSchema({ typeDefs, resolvers }));
  });

  return schemas;
};
