import { SelectedClientsProvider } from './contexts/SelectedClientsContext';
import ViewCustomersPage from './features/clients/ui/pages/ViewCustomerApp';

export default function ViewCustomersApp() {
  return (
    <SelectedClientsProvider>
      <ViewCustomersPage />
    </SelectedClientsProvider>
  );
}
