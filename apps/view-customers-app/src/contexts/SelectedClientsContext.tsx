import { createContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

export interface Client {
  id: string;
  name: string;
  salary: string;
  company: string;
}

interface SelectedClientsContextType {
  selectedClients: Client[];
  addClient: (_client: Client) => void;
  removeClient: (_clientId: string) => void;
  clearAllClients: () => void;
  isClientSelected: (_clientId: string) => boolean;
}

const SelectedClientsContext = createContext<
  SelectedClientsContextType | undefined
>(undefined);

export { SelectedClientsContext };

const STORAGE_KEY = 'teddy_selected_clients';

export function SelectedClientsProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [selectedClients, setSelectedClients] = useState<Client[]>(
    []
  );

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setSelectedClients(JSON.parse(saved));
      } catch (error) {
        console.error('Error loading selected clients:', error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(selectedClients)
    );
  }, [selectedClients]);

  const addClient = (client: Client) => {
    setSelectedClients((prev) => {
      if (prev.find((c) => c.id === client.id)) {
        return prev;
      }
      return [...prev, client];
    });
  };

  const removeClient = (clientId: string) => {
    setSelectedClients((prev) =>
      prev.filter((c) => c.id !== clientId)
    );
  };

  const clearAllClients = () => {
    setSelectedClients([]);
  };

  const isClientSelected = (clientId: string) => {
    return selectedClients.some((c) => c.id === clientId);
  };

  return (
    <SelectedClientsContext.Provider
      value={{
        selectedClients,
        addClient,
        removeClient,
        clearAllClients,
        isClientSelected,
      }}
    >
      {children}
    </SelectedClientsContext.Provider>
  );
}
