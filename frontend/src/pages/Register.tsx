import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { UserContext, UserContextType } from "../context/UserContext";


export default function Register(){
    const {user, setUser} = useContext(UserContext) as UserContextType;
    const [username, setUsername] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [passwordConfirmation, setPasswordConfirmation] = useState<string>("");
    const navigate = useNavigate();

    async function handleSubmit(e:any){
        e.preventDefault();

        var res = await fetch(process.env.REACT_APP_DATA_API+"users",
            {
                method: 'POST',
                credentials: 'include',
                headers: 
                { 
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "user": {
                        username: username,
                        email: email,
                        password: password,
                        password_confirmation: passwordConfirmation
                    }
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
                <h2 className="form-title">Cadastro</h2>
                <input className="form-input" onChange={(e)=>setUsername(e.target.value)} type="username" name="username" placeholder="Nome de usuário" required/>
                <input className="form-input" onChange={(e)=>setEmail(e.target.value)} type="email" name="email" placeholder="E-mail" required/>
                <input className="form-input" onChange={(e)=>setPassword(e.target.value)} type="password" name="password" placeholder="Senha" required/>
                <input className="form-input" onChange={(e)=>setPasswordConfirmation(e.target.value)} type="password" name="passwordConfirmation" placeholder="Confirme a senha" required/>
                <button className="form-button" type="submit" onClick={handleSubmit}>Cadastrar</button>
            </form>
        </div>
    );
}