import React, { createContext, useContext, useState } from "react";

type ModuleContextType = {
    selectedModule: string | null;
    setSelectedModule: (module: string) => void;
    needsUpdate: boolean; // Novo estado para controle de atualização
    setNeedsUpdate: (needsUpdate: boolean) => void; // Função para atualizar o estado
};

const ModuleContext = createContext<ModuleContextType | undefined>(undefined);

interface ModuleProviderProps {
    children: React.ReactNode;
}

export const ModuleProvider: React.FC<ModuleProviderProps> = ({ children }) => {
    const [selectedModule, setSelectedModule] = useState<string | null>(null);
    const [needsUpdate, setNeedsUpdate] = useState(false); // Estado para controle de atualização

    return (
        <ModuleContext.Provider
            value={{
                selectedModule,
                setSelectedModule,
                needsUpdate, // Adicionar ao contexto
                setNeedsUpdate, // Adicionar ao contexto
            }}
        >
            {children}
        </ModuleContext.Provider>
    );
};

export const useModule = (): ModuleContextType => {
    const context = useContext(ModuleContext);
    if (!context) {
        throw new Error("useModule must be used within a ModuleProvider");
    }
    return context;
};