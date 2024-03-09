import { createContext, useState } from "react";

export interface UserProps {
    id: number;
    email: string;
    username: string;
    admin: boolean;
}

export interface UserContextType {
    user: UserProps | undefined;
    setUser: React.Dispatch<React.SetStateAction<UserProps | undefined>>;
}
export const UserContext = createContext<UserContextType | null>(null);

export const UserProvider : React.FC<{children: React.ReactNode}> = ({children}) => {
    const [user, setUser] = useState<UserProps>();

    return (
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    ); 
};