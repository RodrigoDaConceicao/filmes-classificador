import { useEffect, useState } from "react";
import CardScroller from "../components/CardScroller";
import MiniCard from "../components/MiniCard";
import { useMoviesService, IMovie } from "../services/MoviesService";

export default function Home() {
    const [topRated,setTopRated] = useState<IMovie[]>([]);
    const [topVoted,setTopVoted] = useState<IMovie[]>([]);
    const [newests,setNewests] = useState<IMovie[]>([]);
    const {movieService} = useMoviesService();
    
    useEffect(()=>{
        async function fillmovies(){
            setTopRated(await movieService.GetTopRated());
            setTopVoted(await movieService.GetTopVoted());
            setNewests(await movieService.GetNewests());
        }

        fillmovies();
    },[]);

    

    return (
        <div className="container d-flex flex-column gap-3 my-3">
            <h2 className="d-none">Home</h2>
            <CardScroller key="cardscroller1" title="Melhores avaliados">
                {topRated.map((movie:IMovie)=>(<MiniCard key={movie.id} {...movie} />))}
            </CardScroller>
            <CardScroller key="cardscroller2" title="Mais votados">
                {topVoted.map((movie:IMovie)=>(<MiniCard key={movie.id} {...movie} />))}
            </CardScroller>
            <CardScroller key="cardscroller3" title="Recentes">
                {newests.map((movie:IMovie)=>(<MiniCard key={movie.id} {...movie} />))}
            </CardScroller>
        </div>
    )
}