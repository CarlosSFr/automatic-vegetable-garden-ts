import { ReactNode, createContext } from "react";


export const UserContext = createContext({});

type UserContextProviderProps = {
    children: ReactNode;
}

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

