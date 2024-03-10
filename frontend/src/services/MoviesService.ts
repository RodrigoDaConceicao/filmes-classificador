import HttpService from "./HttpService";

export interface IMovie {
    id?: number;
    title?: string;
    director?: string;
    poster_path?: string;
    release_date?: Date;
    overview?: string;
    runtime?: number;
    vote_count?: number;
    average_score?: number;
    user_score?: number;
}
export interface IUserMovie {
    movie_id?: number;
    user_id?: number;
    score?: number;
}

export function useMoviesService() {
    const MOVIES_PATH = process.env.REACT_APP_DATA_API + 'movies';
    const USER_MOVIES_PATH = process.env.REACT_APP_DATA_API + 'user_movies';

    const MoviesService = {
        PostMovie: async function (movie: IMovie) {
            return await HttpService.Post(MOVIES_PATH, movie);
        },
        PostRating: async function (user_movie: IUserMovie) {
            return await HttpService.Post(USER_MOVIES_PATH, user_movie);
        },
        PostMoviesCsv: async function (file: File, separator: string) {
            return await HttpService.PostCsv(MOVIES_PATH + `/import?separator=${separator}`, file);
        },
        PostRatingsCsv: async function (file: File, separator: string) {
            return await HttpService.PostCsv(USER_MOVIES_PATH + `/import?separator=${separator}`, file);
        },
        PatchRating: async function (user_movie: IUserMovie) {
            return await HttpService.Patch(USER_MOVIES_PATH + `/${user_movie.movie_id}`, { user_movie: user_movie });
        },
        Search: async function (query: string) {
            return await HttpService.Get(MOVIES_PATH + `/search?query=${query}`);
        },
        GetMovie: async function (movie_id: string) {
            return await HttpService.Get(MOVIES_PATH + `/${movie_id}`);
        },
        GetTopRated: async function () {
            return await HttpService.Get(MOVIES_PATH + "/top_rated");
        },
        GetTopVoted: async function () {
            return await HttpService.Get(MOVIES_PATH + "/top_voted");
        },
        GetNewests: async function () {
            return await HttpService.Get(MOVIES_PATH + "/newests");
        }
    }


    return { movieService: MoviesService }
}
