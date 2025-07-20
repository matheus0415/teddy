import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { SelectedClientsProvider } from './contexts/SelectedClientsContext';
import ViewCustomersApp from './features/clients/ui/pages/ViewCustomerApp';

const root = createRoot(document.getElementById('root')!);

const isStandalone = window.location === window.parent.location;

root.render(
  <StrictMode>
    <SelectedClientsProvider>
      {isStandalone ? (
        <BrowserRouter>
          <ViewCustomersApp />
        </BrowserRouter>
      ) : (
        <ViewCustomersApp />
      )}
    </SelectedClientsProvider>
  </StrictMode>
);
