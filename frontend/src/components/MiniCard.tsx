import { FaStar } from "react-icons/fa6";
import { MdOutlineBlock } from "react-icons/md";
import "./MiniCard.css"
import { useState } from "react";
import { useNavigate } from "react-router";
import { IMovie } from "../services/MoviesService";


export default function MiniCard(props: IMovie){
    const [showInfo, setShowInfo] = useState<boolean>(false);
    const navigate = useNavigate();
    
    function getPosterUrl()
    {
        return props.poster_path ? process.env.REACT_APP_IMG_API_SML + props.poster_path + "?api_key=" + process.env.REACT_APP_IMG_API_KEY : ""
    }
    function toggleInfo(){
        setShowInfo(!showInfo);
    }
    function visitMoviePage() {
        navigate(`/movie/${props.id}`, { replace: true });
    }
    return(
        <div className="minicard">
            <MdOutlineBlock className="position-absolute w-100 h-100 z-n1"/>
            <img className="minicard-poster"  onClick={toggleInfo} src={getPosterUrl()} />
            <div className="minicard-info" onClick={toggleInfo} >
                <h4 className="minicard-title">{props.title}</h4>
                <div className={`minicard-info-visit ${showInfo ? "minicard-info-selected" : "" }`}>
                    <p className="minicard-score">{props.average_score?.toFixed(1)}<FaStar style={{marginTop:"-4px"}} /></p>
                    <div className="minicard-footer">
                        <button className="minicard-button" onClick={visitMoviePage}>Visitar</button>
                    </div>
                </div>
            </div>
        </div>
    );
}