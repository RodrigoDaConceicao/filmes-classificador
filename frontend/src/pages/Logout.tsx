import { useContext, useEffect } from "react";
import { UserContext, UserContextType } from "../context/UserContext";
import { useNavigate } from "react-router";

export default function Logout(){
    const {user, setUser} = useContext(UserContext) as UserContextType;
    const navigate = useNavigate();

    useEffect(()=>{
        logout();
      }, []);
    
      async function logout() {
        var res = await fetch(process.env.REACT_APP_DATA_API+`sessions/${user ? user.id : ''}`,
          {
            method: 'DELETE',
            credentials: 'include',
            headers: 
            { 
              'Content-Type': 'application/json',
            }
          }
        );
    
        handleResponse(await res.json(), res.status);
      }
      function handleResponse(data: any, status:number){
        if (status === 200){
            setUser(undefined);
        }
        navigate("/", { replace: true });
      }

    return (
        <>
        
        </>
    );
}