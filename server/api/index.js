import fetch from "node-fetch";
import { API_KEY } from "../env";

const DISCOVER_URL = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=true&include_video=false&page=1`;
const TRENDING_URL = `https://api.themoviedb.org/3/trending/all/day?api_key=${API_KEY}`;
const SEARCH_URL = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&page=1&include_adult=true`;
const TV_URL = `https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}&language=en-US&page=1`;
const MOVIES_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
const NEW_MOVIES_URL = `
https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`;
const TV_GENRE_URL = `https://api.themoviedb.org/3/tv`;

export const discover = async (id) =>
  await fetch(DISCOVER_URL + `&with_genres=${id}`).then((res) => res.json());

export const trending = async () =>
  await fetch(TRENDING_URL).then((res) => res.json());

export const tv = async (query) =>
  await fetch(TV_URL).then((res) => res.json());

export const movies = async (query) =>
  await fetch(MOVIES_URL).then((res) => res.json());

export const search = async (query) =>
  await fetch(SEARCH_URL + `&query=${query}`).then((res) => res.json());

export const new_movies = async () =>
  await fetch(NEW_MOVIES_URL).then((res) => res.json());

export const tv_genre = async (id) =>
  await fetch(
    TV_GENRE_URL +
      `/${id}` +
      `/similar?api_key=${API_KEY}&language=en-US&page=1`
  ).then((res) => res.json());
