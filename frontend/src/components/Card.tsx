import { FaStar } from "react-icons/fa6";
import { MdOutlineBlock } from "react-icons/md";
import { useState } from "react";
import { useNavigate } from "react-router";
import { IMovie } from "../services/MoviesService";
import './Card.css'

export default function Card(props: IMovie){
    const [showInfo, setShowInfo] = useState<boolean>(false);
    const navigate = useNavigate();
    
    function getPosterUrl()
    {
        return props.poster_path ? process.env.REACT_APP_IMG_API_BIG + props.poster_path + "?api_key=" + process.env.REACT_APP_IMG_API_KEY : ""
    }
    function visitMoviePage() {
        navigate(`/movie/${props.id}`, { replace: true });
    }
    return(
        <div className="card mt-3 p-3 d-flex flex-column justify-content-between">
            <div className="card-img">
                <img className="w-100 h-100" src={getPosterUrl()} />
                <MdOutlineBlock className="position-absolute w-100 h-100 top-0 left-0"/>
            </div>
            <h3 className="p-2 text-wrap">{props.title}</h3>
            <div className="d-flex justify-content-center gap-3">
                <button className="" onClick={visitMoviePage}>Visitar</button>
                <p className="flex-grow-1 h-100 m-0"><FaStar />{props.average_score?.toFixed(2)}</p>
            </div>
    </div>
    );
}