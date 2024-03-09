import { useContext, useEffect, useState } from "react";
import { UserContext, UserContextType } from "../contexts/UserContext";
import { useNavigate } from "react-router";
import MoviesService, { IMovie } from "../services/MoviesService";

export default function MovieNew(){
    const {user, setUser} = useContext(UserContext) as UserContextType;
    const [movie, setMovie] = useState<IMovie>({});
    const navigate = useNavigate();

    async function handleSubmit(e:any){
        e.preventDefault();
        var m = await MoviesService.PostMovie(movie);
        m.id && navigate(`/movie/${m.id}`, {replace: true});
    }
    return (
        <div className="container d-flex flex-column justify-content-center my-4">
            <h2 className="">Novo filme</h2>
            <form className="d-flex flex-column align-items-center justify-content-center page-form p-5" action="">
                <div className="d-flex w-100 justify-content-around flex-wrap gap-5">
                    <div className="d-flex justify-content-begin flex-column gap-3 flex-grow-1">
                        <input className="w-100" onChange={(e)=>setMovie({...movie, title: e.target.value})} type="text" name="title" placeholder="Título" required/>
                        <input className="w-100" onChange={(e)=>setMovie({...movie, director: e.target.value})} type="text" name="director" placeholder="Diretor(a)" required/>
                        <input className="w-100" onChange={(e)=>setMovie({...movie, poster_path: e.target.value})} type="text" name="poster_path" placeholder="Diretório do poster" />
                    </div>
                    <div className="d-flex justify-content-begin flex-column gap-3 flex-grow-1">
                        <input className="w-100 text-center" onChange={(e)=>setMovie({...movie, release_date: new Date(e.target.value)})} type="date" name="release_date" placeholder="Título" required/>
                        <input className="w-100" onChange={(e)=>setMovie({...movie, runtime: parseInt(e.target.value)})} type="number" name="runtime" placeholder="Duração" required/>
                    </div>
                </div>
                <textarea className="w-100" onChange={(e)=>setMovie({...movie, overview: e.target.value})} name="overview" placeholder="Resumo" required/>
                <button className="" type="submit" onClick={handleSubmit}>Cadastrar</button>
            </form>
        </div>
    );
}