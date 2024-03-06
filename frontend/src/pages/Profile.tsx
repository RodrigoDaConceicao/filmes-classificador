import { useContext } from "react";
import { UserContext, UserContextType } from "../context/UserContext";

export default function Profile(){
    const {user} = useContext(UserContext) as UserContextType;
    return (
        <>
            <p>username: {user?.username}</p>
        </>
    );
}