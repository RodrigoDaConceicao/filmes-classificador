import { useContext, useEffect, useState } from "react";
import { UserContext, UserContextType } from "../contexts/UserContext";
import MoviesService from "../services/MoviesService";

export default function ImportRatings() {
    const {user, setUser} = useContext(UserContext) as UserContextType;
    const [file, setFile] = useState<File>()
    const [separator, setSeparator] = useState<string>('comma');

    useEffect(()=>{
        var labelElement = document.getElementById("movie-csv-label");
        if (labelElement)
            labelElement.innerText = file ? "Selecionado: " + file.name : "Escolha um arquivo (.csv)";
    }, [file])

    function fileChanged(e:any)
    {
        setFile(e.target.files[0]);
    }
    function handleSubmit(e:any){
        e.preventDefault()

        if (file)
            MoviesService.PostRatingsCsv(file, separator);
    }
    function separatorChanged(e:any){
        setSeparator(e.target.value);
    }
    if (user?.admin)
        return (
            <div className="container d-flex flex-column justify-content-center my-4">
                <h2 className="form-title">Importar avaliações</h2>
                <form className="d-flex flex-column align-items-center justify-content-center page-form p-5" action="" >
                    <label id="movie-csv-label" htmlFor="file">Escolha um arquivo (.csv)</label>
                    <input className="d-none" type="file" id="file" name="file" onChange={fileChanged} accept=".csv" />
                    <div className="container d-flex justify-content-center flex-column flex-wrap gap-1 align-items-center">
                        <h5 className="">Separador</h5>
                        <div className="d-flex gap-3" >
                            <div className="d-flex gap-1">
                                <input type="radio" id="comma" name="separator" value="comma" checked={separator === "comma"} onChange={separatorChanged} />
                                <label className="border-0" htmlFor="comma">Vírgula</label>
                            </div>
                            <div className="d-flex gap-1">
                                <input type="radio" id="semicolon" name="separator" value="semicolon" checked={separator === "semicolon"} onChange={separatorChanged} />
                                <label className="border-0" htmlFor="semicolon">Ponto e vírgula</label>
                            </div>
                        </div>
                    </div>
                    <button type="submit" onClick={handleSubmit}>Enviar</button>
                </form>
            </div>
        )
    else
        return(
            <>
            <div className="container d-flex flex-column justify-content-center my-4">
                <h2 className="form-title">Usuário não autorizado</h2>
            </div></>
    )
}