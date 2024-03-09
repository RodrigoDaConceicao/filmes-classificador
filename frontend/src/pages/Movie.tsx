import { useContext, useEffect, useState } from "react";
import { MdOutlineBlock } from "react-icons/md";
import MoviesService, { IMovie } from "../services/MoviesService";
import { UserContext, UserContextType } from "../contexts/UserContext";
import { useParams } from "react-router-dom";
import { FaStar } from "react-icons/fa6";

export default function Movie() {
    const[movie,setMovie] = useState<IMovie>({});
    const{id} = useParams();
    useEffect(()=>{
        fillMovie();
    }, []);

    function getPosterUrl()
    {
        return movie?.poster_path ? process.env.REACT_APP_IMG_API_BIG + movie.poster_path + "?api_key=" + process.env.REACT_APP_IMG_API_KEY : ""
    }

    async function fillMovie(){
        var m = await MoviesService.GetMovie(id as string);
        m.release_date &&= new Date(m.release_date);
        setMovie(m);
    }

    return (
        <div className="container my-3 d-flex flex-column gap-3">
            <div>
                <h2><span className="">Título: </span>{movie?.title}</h2>
                <div className="d-flex flex-wrap gap-3">
                    <div className="movie-img p-3 flex-grow-1">
                        <MdOutlineBlock className="position-absolute w-100 h-100"/>
                        <img className="position-relative w-100 h-100" src={ movie?.poster_path ? getPosterUrl(): '' }></img>
                    </div>
                    <div className="d-flex flex-column">
                        <h3 className="movie-info">
                            <span className="">Diretor(a): </span>
                            {movie.director}
                        </h3>
                        <h3 className="movie-info">
                            <span className="">Lançamento: </span>
                            {movie.release_date?.toLocaleDateString()}
                            </h3>
                        <h3 className="movie-info">
                            <span className="">Duração: </span>
                            {movie.runtime}
                            </h3>
                        <h3 className="movie-info">
                            <span className="">Avaliação: </span>
                            {movie.average_score?.toFixed(1)}<FaStar style={{marginTop:"-8px"}} />
                            </h3>
                        <h3 className="movie-info">
                            <span className="">Votos: </span>
                            {movie.vote_count}
                        </h3>
                    </div>
                </div>
            </div>
            <p><span className="info-title">Resumo: </span>{movie?.overview}</p>
        </div>
    )
}