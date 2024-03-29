import { useEffect, useState } from "react";
import Card from "../components/Card";
import { useMoviesService,  IMovie } from "../services/MoviesService";
import { useSearchParams } from "react-router-dom";

export default function Search() {
    const [movies,setMovies] = useState<IMovie[]>([]);
    const [searchParams] = useSearchParams();
    const {movieService} = useMoviesService();

    
    useEffect(()=>{
        async function fillMovies() {
            setMovies(await movieService.Search(searchParams.get('query') as string));
        }
        
        fillMovies();
    }, [searchParams]);
    
    return (
        <div className="container d-flex flex-wrap gap-3 justify-content-around">
            <h2 className="my-3 w-100">Busca: {searchParams.get('query')}</h2>
            {movies.map((movie:IMovie)=>(<Card key={movie.id} {...movie} />))}
        </div>
    )
}