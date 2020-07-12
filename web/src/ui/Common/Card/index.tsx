import ApolloClient, { gql } from "apollo-boost";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
});

/* client
  .query({
    query: gql`
      {
        trending {
          id
          title
          poster_path
          backdrop_path
          release_date
        }
      }
    `,
  })
  .then((result) => console.log(result)); */

export default client;
