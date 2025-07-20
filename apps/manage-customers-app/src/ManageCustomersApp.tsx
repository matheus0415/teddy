import { Provider } from 'react-redux';
import { store } from './store';
import Dashboard from './features/clients/ui/pages/Dashboard';

export default function ManageCustomersApp() {
  return (
    <Provider store={store}>
      <Dashboard />
    </Provider>
  );
}
