import { useContext } from "react";
import { CyclesContext } from "../contexts/CyclesContext";


export function useUser() {
    const context = useContext(CyclesContext);

    return context;
}