import { Link, useNavigate } from "react-router-dom";
import { PiFilmSlate } from "react-icons/pi";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { GiHamburgerMenu } from "react-icons/gi";
import "./Navbar.css"
import { useContext, useState } from "react";
import { UserContext, UserContextType } from "../context/UserContext";

export default function Navbar() {
    enum NavStatus{
        COLLAPSED,
        EXPANDED
    }

    const [query, setQuery] = useState<string>("");
    const [navStatus, setNavStatus] = useState<NavStatus>(NavStatus.COLLAPSED);
    const {user} = useContext(UserContext) as UserContextType;
    const navigate = useNavigate();

    function toggleNavStatus() {
        if (navStatus === NavStatus.EXPANDED)
            setNavStatus(NavStatus.COLLAPSED)
        else
            setNavStatus(NavStatus.EXPANDED);
    }

    function preventSubmit(e:any){

        e.preventDefault();
        
        if (!query) return;

        navigate(`/search?query=${query}`, { replace: true });
        setQuery("");
    }
    return (
    <nav className="navbar">
        <div className="navbar-container">
            <h1 style={{display: "none"}}>Filmes Classificador</h1>
            <div className="navbar-left">
                <Link className="navbar-home" to="/"><PiFilmSlate className="navbar-home-icon" /><span className="navbar-home-text">Filmes Classificador</span></Link>
            </div>
            <div className="navbar-center">
                <form action="search" className="navbar-search" onSubmit={preventSubmit}>
                    <input className="navbar-search-input" onChange={(e:any) => setQuery(e.target.value)} type="search" id="movie-search" name="query" size={1} />
                    <button className="navbar-button" type="submit"><FaMagnifyingGlass /></button>
                </form>
            </div>
            <div className="navbar-right">
                <button className="navbar-accordion-activator" onClick={toggleNavStatus}><GiHamburgerMenu /></button>
                {!user && (
                <>
                    <Link className="navbar-link" to="/login">
                        <button className="navbar-button navbar-user-button">login</button>
                    </Link>
                    <Link className="navbar-link" to="/register">
                        <button className="navbar-button navbar-user-button">cadastrar</button>
                    </Link>
                </>
                )}
                {user && (
                <>
                    <Link className="navbar-link" to="/profile">
                        <button className="navbar-button navbar-user-button">{user.username}</button>
                    </Link>
                    <Link className="navbar-link" to="/logout">
                        <button className="navbar-button navbar-user-button">sair</button>
                    </Link>
                </>
                )}

                

            </div>
        </div>
        {navStatus === NavStatus.EXPANDED && (
            <>
                {!user && (
                    <div className="navbar-accordion">
                        <Link to="/login">
                            <button className="navbar-accordion-button">login</button>
                        </Link>
                        <Link to="/register">
                            <button className="navbar-accordion-button">cadastrar</button>
                        </Link>
                    </div>
                )}
                {user && (
                    <div className="navbar-accordion">
                        <Link to="/profile">
                            <button className="navbar-accordion-button">{user.username}</button>
                        </Link>
                        <Link to="/logout">
                            <button className="navbar-accordion-button">sair</button>
                        </Link>
                    </div>
                )}
            </>
        )}
        
    </nav>
    );
}