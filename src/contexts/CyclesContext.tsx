import React, { createContext, useContext, useState } from "react";

type ModuleContextType = {
    selectedModule: string | null;
    setSelectedModule: (module: string) => void;
};

const ModuleContext = createContext<ModuleContextType | undefined>(undefined);

interface ModuleProviderProps {
    children: React.ReactNode;
}

export const ModuleProvider: React.FC<ModuleProviderProps> = ({ children }) => {
    const [selectedModule, setSelectedModule] = useState<string | null>(null);

    return (
        <ModuleContext.Provider value={{ selectedModule, setSelectedModule }}>
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
