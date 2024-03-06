import { FaStar } from "react-icons/fa6";
import "./MiniCard.css"
import { useState } from "react";
import { useNavigate } from "react-router";

export interface MiniCardProps {
    id: number;
    title: string;
    posterPath?: string;
    averageScore: number;
}

export default function MiniCard(props: MiniCardProps){
    const [showInfo, setShowInfo] = useState<boolean>(false);
    const navigate = useNavigate();
    
    function getPosterUrl()
    {
        return props.posterPath ? process.env.REACT_APP_IMG_API_SML + props.posterPath + "?api_key=" + process.env.REACT_APP_IMG_API_KEY : ""
    }
    function toggleInfo(){
        setShowInfo(!showInfo);
    }
    function visitMoviePage() {
        navigate(`/movie/${props.id}`, { replace: true });
    }
    return(
        <div className="minicard">
            <img className="minicard-poster" alt="" onClick={toggleInfo} src={getPosterUrl()}/>
            <div className={`minicard-info ${showInfo ? "minicard-info-selected" : "" }`} onClick={toggleInfo} >
                <h4 className="minicard-title">{props.title}</h4>
                <p className="minicard-score"><FaStar />{props.averageScore}</p>
                <div className="minicard-footer">
                    <button className="minicard-button" onClick={visitMoviePage}>Visitar</button>
                </div>
            </div>
        </div>
    );
}