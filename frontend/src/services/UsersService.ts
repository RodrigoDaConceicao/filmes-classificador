import HttpService from "./HttpService";
import Http from "./HttpService"
import { IMovie } from "./MoviesService";

export interface IUser {
    id?: number;
    username?: string;
    email?: string;
    password?: string;
    password_confirmation?: string;
}

const SESSION_PATH = process.env.REACT_APP_DATA_API + 'sessions';
const USERS_PATH = process.env.REACT_APP_DATA_API + 'users';

const UsersService = {
    GetMovies: async function (id: number | undefined): Promise<IMovie[]> {
        if (!id) return [];
        var json = await HttpService.Get(USERS_PATH + `/${id}/movies`);
        return json.map((m: any) => {
            return { ...m, release_date: m.release_date &&= new Date(m.release_date) }
        });
    },
    PostSession: async function (user: IUser): Promise<IUser> {
        return await Http.Post(USERS_PATH, user as JSON);
    },
    DestroySession: async function (): Promise<IUser> {
        var user = Http.Delete(USERS_PATH);
        return {}
    }
}

export default UsersService;
