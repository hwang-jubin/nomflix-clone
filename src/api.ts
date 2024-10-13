const API_KEY = "f60e1ca5c47251e735de133bb4d40dc4";
const BASE_PATH = "https://api.themoviedb.org/3";

export interface IMovie {
  id: number;
  backdrop_path: string;
  poster_path: string;
  overview: string;
  title: string;
}

interface ITv {
  id: number;
  backdrop_path: string;
  poster_path: string;
  overview: string;
  original_name: string;
}

export interface IGetMoviesResult {
  dates: {
    maximum: string;
    minimum: string;
  };
  page: number;
  results: IMovie[];
  total_pages: number;
  total_results: number;
}

export interface IGetTvResult {
  dates: {
    maximum: string;
    minimum: string;
  };
  page: number;
  results: ITv[];
  total_pages: number;
  total_results: number;
}

interface ISearch {
  id: number;
  overview: string;
  original_name: string;
  backdrop_path: string;
}
export interface IDetail {
  genres: {
    name: string;
  }[];
  vote_average: number;
}

export interface IGetSearch {
  results: ISearch[];
  total_pages: number;
  total_results: number;
}

export function getMovies(category: string) {
  return fetch(`${BASE_PATH}/movie/${category}?api_key=${API_KEY}`).then(
    (response) => response.json()
  );
}

export function getTv(category: string) {
  return fetch(`${BASE_PATH}/tv/${category}?api_key=${API_KEY}`).then(
    (response) => response.json()
  );
}

export function getSearch(media: string, keyword: string) {
  return fetch(
    `${BASE_PATH}/search/${media}?api_key=${API_KEY}&&query=${keyword}`
  ).then((response) => response.json());
}

export function getDetail(media: string, id: number) {
  return fetch(`${BASE_PATH}/${media}/${id}?api_key=${API_KEY}`).then(
    (response) => response.json()
  );
}

// https://api.themoviedb.org/3/movie/now_playing?api_key=f60e1ca5c47251e735de133bb4d40dc4&&language=en-US&page=1&region=kr
// https://image.tmdb.org/t/p/original/efuPybo8V8KTYGslQphO74LRvm0.jpg
// https://api.themoviedb.org/3/tv/on_the_air?api_key=f60e1ca5c47251e735de133bb4d40dc4&&language=en-US&page=1
// 'https://api.themoviedb.org/3/search/movie?api_key=f60e1ca5c47251e735de133bb4d40dc4&&query=dune
// https://api.themoviedb.org/3/movie/917496?language=en-US'
