import { Link, useNavigate } from "react-router-dom";
import { PiFilmSlate } from "react-icons/pi";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { GiHamburgerMenu } from "react-icons/gi";
import { useContext, useState } from "react";
import { UserContext, UserContextType } from "../contexts/UserContext";

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
    <>
        <nav className="container-fluid d-flex justify-content-between py-2">

            <h1 className="d-none">Classificador</h1>
            <div className="">
                <Link className="link-unstyled h-100 d-flex align-items-center" to="/"><PiFilmSlate size={32} /><span className="d-none d-sm-inline">Classificador</span></Link>
            </div>
            <div className="d-flex justify-content-center flex-grow-1">
                <form action="search" className="d-flex container-fluid justify-content-center" onSubmit={preventSubmit}>
                    <input className="flex-grow-1" value={query} onChange={(e:any) => setQuery(e.target.value)} type="search" id="movie-search" name="query" size={1} />
                    <button className="px-2" type="submit"><FaMagnifyingGlass /></button>
                </form>
            </div>
            <div className="navbar-right d-flex align-items-center">
                <button className="d-sx-inline-flex d-sm-none align-items-center h-100 px-2" onClick={toggleNavStatus}><GiHamburgerMenu size={20} /></button>
                <div className="d-none d-sm-flex h-100">
                    {!user && (
                    <>
                        <Link className="h-100" to="/login">
                            <button className="h-100">login</button>
                        </Link>
                        <Link className="h-100" to="/register">
                            <button className="h-100">cadastrar</button>
                        </Link>
                    </>
                    )}
                    {user && (
                    <>
                        <Link className="h-100" to="/profile">
                            <button className="h-100">{user.username}</button>
                        </Link>
                        <Link className="h-100" to="/logout">
                            <button className="h-100">sair</button>
                        </Link>
                    </>
                    )}
                </div>
            </div>
        </nav>
        {navStatus === NavStatus.EXPANDED && (
            <div id="hidden-menu" className="position-absolute w-100 d-flex d-sm-none flex-column p-2">
                {!user && (
                    <>
                        <Link to="/login">
                            <button className="w-100">login</button>
                        </Link>
                        <Link to="/register">
                            <button className="w-100">cadastrar</button>
                        </Link>
                    </>
                )}
                {user && (
                    <>
                        <Link to="/profile">
                            <button className="w-100">{user.username}</button>
                        </Link>
                        <Link to="/logout">
                            <button className="w-100">sair</button>
                        </Link>
                    </>
                )}
            </div>
        )}
        
    </>
    );
}