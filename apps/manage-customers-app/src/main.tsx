import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from './store';
import Dashboard from './features/clients/ui/pages/Dashboard';
import './index.css';

const isStandalone = window.location === window.parent.location;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      {isStandalone ? (
        <BrowserRouter>
          <Dashboard />
        </BrowserRouter>
      ) : (
        <Dashboard />
      )}
    </Provider>
  </StrictMode>
);
