import { gql } from "apollo-boost";

export const TRENDING = gql`
  {
    results: trending {
      id
      title
      poster_path
      release_date
      original_name
      original_title
    }
  }
`;

export const TV = gql`
  {
    results: tv {
      id
      title
      poster_path
      release_date
      original_name
      original_title
    }
  }
`;

export const MOVIES = gql`
  {
    results: movies {
      id
      title
      poster_path
      release_date
      original_name
      original_title
    }
  }
`;

export const ANIMATION = gql`
  {
    results: discover(id: 16) {
      id
      title
      poster_path
      release_date
      original_name
      original_title
    }
  }
`;

export const NEW_MOVIES = gql`
  {
    results: new_movies {
      id
      title
      poster_path
      release_date
      original_name
      original_title
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
