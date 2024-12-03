import { createContext, useState, useContext } from 'react';

const WorkspaceContext = createContext();

export const WorkspaceProvider = ({ children }) => {
    const [selectedWorkspace, setSelectedWorkspace] = useState(null);

    return (
        <WorkspaceContext.Provider value={{ selectedWorkspace, setSelectedWorkspace }}>
            {children}
        </WorkspaceContext.Provider>
    );
};

export const useWorkspace = () => useContext(WorkspaceContext);