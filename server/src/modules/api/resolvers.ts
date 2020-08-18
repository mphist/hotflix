import {
  discover,
  trending,
  search,
  tv,
  movies,
  new_movies,
  tv_genre,
  //get_movies,
  get_show,
} from ".";

const fetch = async (api, query?) => {
  if (query !== undefined) {
    const response = await api(query);
    if (response.results) {
      return response.results;
    }
    return response;
  }
  const response = await api();
  if (response.results) {
    return response.results;
  }
  console.log(response);
  return response;
};

export const resolvers = {
  Query: {
    discover: (_, { id }) => fetch(discover, id),
    trending: () => fetch(trending),
    tv: () => fetch(tv),
    movies: () => fetch(movies),
    new_movies: () => fetch(new_movies),
    tv_genre: (_, { id }) => fetch(tv_genre, id),
    //get_movies: (_, { id }) => fetch(get_movies, id),
    get_show: (_, { name }) => fetch(get_show, name),
  },
  Mutation: {
    search: (_, { query }) => fetch(search, query),
  },
};
