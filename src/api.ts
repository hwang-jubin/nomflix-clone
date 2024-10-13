const API_KEY = "f60e1ca5c47251e735de133bb4d40dc4";
const BASE_PATH = "https://api.themoviedb.org/3";

interface IMovie {
  id: number;
  backdrop_path: string;
  poster_path: string;
  overview: string;
  title: string;
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

export function getMovies() {
  return fetch(`${BASE_PATH}/movie/now_playing?api_key=${API_KEY}`).then(
    (response) => response.json()
  );
}
// https://api.themoviedb.org/3/movie/now_playing?api_key=f60e1ca5c47251e735de133bb4d40dc4&&language=en-US&page=1&region=kr
// https://image.tmdb.org/t/p/original/efuPybo8V8KTYGslQphO74LRvm0.jpg
