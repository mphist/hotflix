import { register } from "./mutations/register";
import { login } from "./mutations/login";
import { session } from "./query/session";
import { add_to_mylist } from "./mutations/add_to_mylist";
import { get_mylist } from "./query/get_mylist";
export type Resolver = (parent: any, args: any, context: any, info: any) => any;

export type ResolverMap = {
  [key: string]: {
    [key: string]: Resolver;
  };
};

export const resolvers: ResolverMap = {
  Query: {
    hello: () => "Hi, this is a DB resolver",
    session,
    get_mylist,
  },

  Mutation: {
    register,
    login,
    add_to_mylist,
  },
};
