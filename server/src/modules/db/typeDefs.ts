import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type Query {
    hello: String
    session: Session
    get_mylist(email: String): [Show!]
  }

  type Mutation {
    register(email: String, phone: String, password: String!): [RegisterStatus!]
    login(email: String, phone: String, password: String!): [LoginStatus!]
    add_to_mylist(email: String, show_id: Int, show_title: String): MyList!
  }

  type RegisterStatus {
    path: String!
    error: String!
    confirmationEmail: String
  }

  type LoginStatus {
    path: String!
    error: String!
    userId: String
    email: String
  }

  type User {
    id: ID!
    email: String!
  }

  type Session {
    email: String
    userId: String
  }

  type Context {
    url: String
    session: Session
  }

  type MyList {
    message: String
  }

  type Show {
    id: Int
    title: String
    original_name: String
    original_title: String
    poster_path: String
  }
`;
