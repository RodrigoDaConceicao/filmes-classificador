import { useContext, useEffect, useState } from "react";
import { MdOutlineBlock, MdOutlineClose } from "react-icons/md";
import { AiOutlineLoading } from "react-icons/ai";
import { FaStar, FaCheck  } from "react-icons/fa6";
import { IMovie, useMoviesService } from "../services/MoviesService";
import { UserContext, UserContextType } from "../contexts/UserContext";
import { useParams } from "react-router-dom";

enum VoteState{
    IDLE,
    IN_PROGRESS,
    ACCEPTED,
    FAILED,
}
export default function Movie() {
    const{user} = useContext(UserContext) as UserContextType;
    const[voteState, setVoteState] = useState<VoteState>(VoteState.IDLE)
    const[movie,setMovie] = useState<IMovie>({});
    const{id} = useParams();
    const{movieService} = useMoviesService();
    
    useEffect(()=>{
        async function fillMovie(){
            var m = await movieService.GetMovie(id as string);
            m.release_date &&= new Date(m.release_date);
            setMovie(m);
        }

        fillMovie();
    }, []);

    function getPosterUrl()
    {
        return movie?.poster_path ? process.env.REACT_APP_IMG_API_BIG + movie.poster_path + "?api_key=" + process.env.REACT_APP_IMG_API_KEY : ""
    }


    async function onVoteChanged(e:any) {
        var req = movie.user_score ? movieService.PatchRating : movieService.PostRating;
        setVoteState(VoteState.IN_PROGRESS);

        try{
            var res = await req({
                user_id:user?.id,
                movie_id: Number.parseInt(id as string),
                score: e.target.value
            });

            setMovie({...movie, user_score: res.score})
            setVoteState(VoteState.ACCEPTED);
        } catch
        {
            setVoteState(VoteState.FAILED);
        }
    }

    return (
        <div className="container my-3 d-flex flex-column gap-3">
            <div>
                <h2><span className="">Título: </span>{movie?.title}</h2>
                <div className="d-flex flex-wrap gap-3">
                    <div className="movie-img p-3 flex-grow-1">
                        <MdOutlineBlock className="position-absolute w-100 h-100"/>
                        <img className="position-relative w-100 h-100" alt="" src={ movie?.poster_path ? getPosterUrl(): '' }></img>
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
                            {movie.runtime != null ? `${movie.runtime} minutos` : null}
                            </h3>
                        <h3 className="movie-info">
                            <span className="">Avaliação: </span>
                            {movie.average_score?.toFixed(1)}<FaStar style={{marginTop:"-8px"}} />
                            </h3>
                        <h3 className="movie-info">
                            <span className="">Votos: </span>
                            {movie.vote_count}
                        </h3>
                        {user && (<h3 className="movie-info">
                            <span className="">Seu voto: </span>
                                <select value={movie.user_score != null ? movie.user_score : ""} disabled={voteState === VoteState.IN_PROGRESS} onChange={onVoteChanged} style={{textAlign:"center", outline: "none"}}>
                                    <option value="">--</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                    <option value="7">7</option>
                                    <option value="8">8</option>
                                    <option value="9">9</option>
                                    <option value="10">10</option>
                                </select>
                                <FaStar style={{marginTop:"-8px"}} />
                                <AiOutlineLoading style={{
                                    marginTop:"-8px",
                                    display: voteState === VoteState.IN_PROGRESS ? "inline" : "none",
                                    animation:"spin 1s linear infinite"
                                    }} />
                                <FaCheck style={{
                                    marginTop:"-8px", color:"lightgreen",
                                    display: voteState === VoteState.ACCEPTED ? "inline" : "none"
                                    }} />
                                <MdOutlineClose style={{
                                    marginTop:"-8px", color:"red",
                                    display: voteState === VoteState.FAILED ? "inline" : "none"
                                    }} />
                        </h3>
                        )}
                    </div>
                </div>
            </div>
            <p><span className="info-title">Resumo: </span>{movie?.overview}</p>
        </div>
    )
}