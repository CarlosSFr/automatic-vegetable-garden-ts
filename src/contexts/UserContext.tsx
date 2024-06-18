import { ReactNode, createContext } from "react";

type UserContextProviderProps = {
    children: ReactNode;
}

export const UserContext = createContext({});

export function UserContextProvider({children}: UserContextProviderProps){

    return(
        <UserContext.Provider
            value={{
                
            }}
        >
            {children}
        </UserContext.Provider>
    )
}

