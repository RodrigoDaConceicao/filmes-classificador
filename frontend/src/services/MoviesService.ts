import { json } from "stream/consumers";
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

const MOVIES_PATH = process.env.REACT_APP_DATA_API + 'movies';
const USER_MOVIES_PATH = process.env.REACT_APP_DATA_API + 'user_movies';

const MoviesService = {
    PostMovie: async function (movie: IMovie) {
        return await HttpService.Post(MOVIES_PATH, movie as JSON);
    },
    PostMoviesCsv: async function (file: File, separator: string) {
        return await HttpService.PostCsv(MOVIES_PATH + `/import?separator=${separator}`, file);
    },
    PostRatingsCsv: async function (file: File, separator: string) {
        return await HttpService.PostCsv(USER_MOVIES_PATH + `/import?separator=${separator}`, file);
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

export default MoviesService