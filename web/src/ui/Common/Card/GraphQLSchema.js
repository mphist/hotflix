import { gql } from "apollo-boost";

export const TRENDING = gql`
  {
    results: trending {
      id
      title
      poster_path
      release_date
    }
  }
`;

export const TV = gql`
  {
    results: tv {
      id
      original_name
      poster_path
      release_date
    }
  }
`;

export const MOVIES = gql`
  {
    results: movies {
      id
      original_title
      poster_path
      release_date
    }
  }
`;

export const ANIMATION = gql`
  {
    results: discover(id: 16) {
      id
      original_title
      poster_path
      release_date
    }
  }
`;

export const NEW_MOVIES = gql`
  {
    results: new_movies {
      id
      original_title
      poster_path
      release_date
    }
  }
`;

export const TV_ACTION = gql`
  {
    results: tv_genre(id: 10765) {
      id
      original_name
      poster_path
    }
  }
`;

export const TV_CRIME = gql`
  {
    results: tv_genre(id: 80) {
      id
      original_name
      poster_path
    }
  }
`;

export const TV_DOCUMENTARY = gql`
  {
    results: tv_genre(id: 99) {
      id
      original_name
      poster_path
    }
  }
`;
