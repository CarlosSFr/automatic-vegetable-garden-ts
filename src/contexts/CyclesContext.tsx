import { ReactNode, createContext, useState } from "react";

type CyclesContextProviderProps = {
    children: ReactNode;
}

export const CyclesContext = createContext({});

export function CyclesContextProvider({ children }: CyclesContextProviderProps) {
    const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);


    return (
        <CyclesContext.Provider
            value={{

            }}
        >
            {children}
        </CyclesContext.Provider>
    )
}

