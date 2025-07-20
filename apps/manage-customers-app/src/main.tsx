import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from './store';
import { SelectedClientsProvider } from './contexts/SelectedClientsContext';
import Dashboard from './features/clients/ui/pages/Dashboard';
import './index.css';

const isStandalone = window.location === window.parent.location;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <SelectedClientsProvider>
        {isStandalone ? (
          <BrowserRouter>
            <Dashboard />
          </BrowserRouter>
        ) : (
          <Dashboard />
        )}
      </SelectedClientsProvider>
    </Provider>
  </StrictMode>
);
