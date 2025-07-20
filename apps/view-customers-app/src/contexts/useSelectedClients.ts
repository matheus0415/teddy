import { useContext } from 'react';
import { SelectedClientsContext } from './SelectedClientsContext';

export function useSelectedClients() {
  const context = useContext(SelectedClientsContext);
  if (!context) {
    throw new Error(
      'useSelectedClients must be used within a SelectedClientsProvider'
    );
  }
  return context;
}
