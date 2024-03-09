import { useContext, useEffect, useState } from "react";
import { UserContext, UserContextType } from "../contexts/UserContext";
import { FaCheck, FaStar } from "react-icons/fa6";
import { MdClose } from "react-icons/md";
import "@progress/kendo-theme-default/dist/all.css"
import { Grid, GridColumn as Column, GridDataStateChangeEvent, GridPageChangeEvent, GridSortChangeEvent, GridFilterChangeEvent } from "@progress/kendo-react-grid";
import { process, State, DataResult } from "@progress/kendo-data-query";
import { Link } from "react-router-dom";
import { IMovie } from "../services/MoviesService";
import UsersService from "../services/UsersService";

const initialDataState: State = {
    sort: [{ field: "title", dir: "desc" }],
    take: 10,
    skip: 0,
    filter:{
        logic: "and",
        filters: [],
    }
};

export default function Profile(){
    const {user} = useContext(UserContext) as UserContextType;
    const [movies, setMovies] = useState<IMovie[]>([]);
    const[dataState, setDataState] = useState<State>(initialDataState);
    const[dataResult, setDataResult] = useState<DataResult>();
    useEffect(()=>{
        fillMovies();
    }, []);
    useEffect(()=>{
        setDataResult(process(movies, dataState))
    },[movies]);

    async function fillMovies(){
        setMovies(await UsersService.GetMovies(user?.id));
    }

    const PosterCell = (props:any) => {
        return(
            <td className="k-table-td text-center">{props.dataItem[props.field] ? <FaCheck style={{color:"green"}} /> : <MdClose style={{color:"red"}} />}</td>
        );
    }
    const DateCell = (props:any) => {
        var formattedDate = "";
        formattedDate = props.dataItem[props.field]?.toLocaleDateString();

        return(
            <td className="k-table-td text-center">{formattedDate}</td>
        );
    }
    const AvgCell = (props:any)=>{
        return(
            <td className="k-table-td text-center">{props.dataItem[props.field].toFixed(1)}<FaStar style={{marginTop:"-5px", color: "var(--element--border-color-focus)"}} /></td>
        );
    }
    
    
    const onDataStateChange = (e: GridDataStateChangeEvent) => {
        setDataState(e.dataState);
        setDataResult(process(movies, e.dataState));
    };
    return (
        <div className="container d-flex flex-column justify-content-center my-4">
            <h2 className="page-title">Perfil de {user?.username}</h2>
            {user?.admin && (
                <div className="d-flex ">
                    <div className="container d-flex justify-content-start my-2 gap-3">
                        <Link to="/import/movies">
                            <button>Importar filmes</button>
                        </Link>
                        <Link to="/import/ratings">
                            <button>Importar Avaliações</button>
                        </Link>
                    </div>
                    <div className="container d-flex justify-content-end my-2 gap-3">
                        <Link to="/movie/new">
                            <button>Adicionar filme</button>
                        </Link>
                    </div>
                </div>
            )}
            <div className="container d-flex justify-content-between my-4">
                <p className="page-info-item">E-mail: {user?.email}</p>
                <p className="page-info-item">Filmes avaliados: {movies.length}</p>
            </div>
            <div className="movie-grid-container d-flex flex-column">
                <Grid
                    style={{height:"450px"}}
                    data={dataResult}
                    filterable={true}
                    pageable={true}
                    sortable={true}
                    {...dataState}
                    onDataStateChange={onDataStateChange}
                    resizable={true}
                    total={movies.length}
                    >
                    <Column field="id" title="id" width={0} filterable={false} />
                    <Column field="title" format="{0:d}" filter="text" title="Título" width="200px"/>
                    <Column field="director" title="Diretor(a)" width="200px" filterable={false} />
                    <Column field="poster_path" title="Poster" width="80px" cell={PosterCell} filterable={false} />
                    <Column field="release_date" title="Data" width="150px" cell={DateCell} filterable={false}/>
                    <Column field="overview" title="Resumo" width="350px" filterable={false} />
                    <Column field="runtime" title="Duração" width="100px" filterable={false} />
                    <Column field="vote_count" title="Votos" width="80px" filterable={false}/>
                    <Column field="average_score" title="Média de Notas"width="80px" cell={AvgCell} filterable={false} />
                    <Column field="user_score" title="Minha nota" width="100px" filterable={false} />
                </Grid>
            </div>
        </div>
    );
}