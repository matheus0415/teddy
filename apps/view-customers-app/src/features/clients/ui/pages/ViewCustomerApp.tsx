import { useState, useEffect, useCallback } from 'react';
import { Menu, User } from 'lucide-react';
import { useSelectedClients } from '../../../../contexts/useSelectedClients';
import type { Client } from '../../../../contexts/SelectedClientsContext';
import Sidebar from '../components/Sidebar';
import Logo from '../../../../../src/components/icons/Logo';

export default function ViewCustomersApp() {
  const { selectedClients, removeClient, clearAllClients } =
    useSelectedClients();

  const [activeTab, setActiveTab] = useState('Clientes selecionados');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [userName, setUserName] = useState('Usuário');

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  useEffect(() => {
    const loadSharedState = () => {
      try {
        const savedState = localStorage.getItem(
          'shared-microfrontend-state'
        );
        if (savedState) {
          const state = JSON.parse(savedState);
          if (state.userName) {
            setUserName(state.userName);
          }
        }
      } catch (error) {
        console.error('Error loading shared state:', error);
      }
    };

    loadSharedState();

    const handleSharedStateChange = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail?.userName) {
        setUserName(customEvent.detail.userName);
      }
    };

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'shared-microfrontend-state' && e.newValue) {
        try {
          const newState = JSON.parse(e.newValue);
          if (newState.userName && newState.userName !== userName) {
            setUserName(newState.userName);
          }
        } catch (error) {
          console.error('Error syncing state:', error);
        }
      }
    };

    window.addEventListener(
      'shared-state-changed',
      handleSharedStateChange
    );
    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener(
        'shared-state-changed',
        handleSharedStateChange
      );
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [userName]);

  const ClientCard = useCallback(
    ({ client }: { client: Client }) => (
      <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
        <div className="text-center">
          <h3 className="font-semibold text-lg text-gray-900 mb-3">
            {client.name}
          </h3>
          <div className="text-sm text-gray-600 space-y-1 mb-4">
            <p>Salário: {client.salary}</p>
            <p>Empresa: {client.company}</p>
          </div>
          <div className="flex justify-end items-center">
            <button
              className="p-1 text-orange-500 hover:text-orange-600 hover:bg-orange-50 rounded"
              onClick={() => removeClient(client.id)}
              title="Remover selecao cliente"
            >
              <span className="text-2xl font-black">−</span>
            </button>
          </div>
        </div>
      </div>
    ),
    [removeClient]
  );

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <div
        className={`transition-all duration-300 ease-in-out ${
          sidebarOpen ? 'w-64' : 'w-0'
        }`}
      >
        <Sidebar
          isOpen={sidebarOpen}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
      </div>

      <div className="flex-1 flex flex-col transition-all duration-300">
        <header className="bg-white border-b border-gray-200">
          <div className="flex items-center px-6 py-4 relative">
            <div className="flex items-center space-x-4">
              <button className="p-2" onClick={toggleSidebar}>
                <Menu size={20} />
              </button>
              <div className="flex items-center space-x-2">
                <Logo width={80} height={40} />
              </div>
            </div>

            <div className="flex space-x-4 md:space-x-6 lg:space-x-8 px-2">
              <button
                className={`text-sm font-medium ${
                  activeTab === 'Clientes'
                    ? 'text-orange-500 underline decoration-orange-500 decoration-2 underline-offset-4'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
                onClick={() => setActiveTab('Clientes')}
              >
                Clientes
              </button>
              <button
                className={`text-sm font-medium ${
                  activeTab === 'Clientes selecionados'
                    ? 'text-orange-500 underline decoration-orange-500 decoration-2 underline-offset-4'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
                onClick={() => setActiveTab('Clientes selecionados')}
              >
                Clientes selecionados
              </button>
              <button
                className={`text-sm font-medium ${
                  activeTab === 'Sair'
                    ? 'text-orange-500 underline decoration-orange-500 decoration-2 underline-offset-4'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
                onClick={() => setActiveTab('Sair')}
              >
                Sair
              </button>
            </div>

            <div className="text-gray-600 text-sm flex items-center space-x-2">
              <span>
                Olá,{' '}
                <span className="font-semibold">{userName}!</span>
              </span>
              <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                <User size={16} className="text-gray-600" />
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 p-6 overflow-y-auto">
          

          <div className="flex justify-between items-center mb-6">
            <h1 className="text-lg font-bold text-gray-900">
              Clientes selecionados:
            </h1>
          </div>

          {selectedClients.length === 0 ? (
            <div className="flex flex-col justify-center items-center h-64 bg-gray-50 rounded-lg border border-gray-200">
              <div className="text-gray-400 text-6xl mb-4">👥</div>
              <h2 className="text-xl font-semibold text-gray-700 mb-2">
                Nenhum cliente selecionado
              </h2>
              <p className="text-gray-600 text-center">
                Vá para a página de clientes e selecione alguns
                clientes para visualizá-los aqui.
              </p>
            </div>
          ) : (
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {selectedClients.map((client: Client) => (
                  <ClientCard key={client.id} client={client} />
                ))}
              </div>
              <div className="flex justify-center">
                <button
                  onClick={clearAllClients}
                  className="w-full px-6 py-3 text-orange-500 border-2 border-orange-500 rounded hover:bg-orange-50 transition-colors font-medium"
                >
                  Limpar clientes selecionados
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
