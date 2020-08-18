import { gql } from "apollo-server-express";

export const typeDefs = gql`
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
    #get_movies(id: Int): Results
    get_show(name: String): [Results]
  }
  type Mutation {
    search(query: String!): [Results]
  }
`;
