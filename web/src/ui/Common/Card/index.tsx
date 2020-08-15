import ApolloClient from "apollo-boost";

const client = new ApolloClient({
  uri: process.env.REACT_APP_BACKEND_HOST + "/graphql",
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
