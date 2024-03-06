import { useContext, useState } from "react";
import { UserContext, UserContextType } from "../context/UserContext";
import "./Forms.css";
import { useNavigate } from "react-router";

export default function Login(){
    const {user, setUser} = useContext(UserContext) as UserContextType;
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const navigate = useNavigate();

    async function handleSubmit(e:any){
        e.preventDefault();

        var res = await fetch(process.env.REACT_APP_DATA_API+"sessions",
            {
                method: 'POST',
                credentials: 'include',
                headers: 
                { 
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            }
        );
        handleResponse(await res.json(), res.status)
    }

    function handleResponse(data: any, status:number){
        if (status === 201){
            setUser(data);
            navigate("/", { replace: true });
        }
    }
    return (
        <div className="form-container">
            <form className="form-begin" action="">
                <h2 className="form-title">Login</h2>
                <input className="form-input" onChange={(e)=>setEmail(e.target.value)} type="email" name="email" placeholder="E-mail" required/>
                <input className="form-input" onChange={(e)=>setPassword(e.target.value)} type="password" name="password" placeholder="Senha" required/>
                <button className="form-button" type="submit" onClick={handleSubmit}>Logar</button>
            </form>
        </div>
    );
}