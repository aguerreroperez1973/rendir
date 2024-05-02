import { createContext, useState } from "react";

export const UserContext = createContext();

    const UserProvider = ({ Children }) => {

        const [user, setUser] = useState({
            email: "desafiolatam@desafiolatam.com",
            displayName: "Desafío Latam",
            });
        
        return (
        <UserContext.Provider value={{ user, setUser }}> {Children} </UserContext.Provider>
        );
    };

export default UserProvider;