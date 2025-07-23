import { Home, UserCheck, Users, LogOut } from 'lucide-react';
import Logo from '../../../../components/icons/logo';

interface SidebarProps {
  isOpen: boolean;
  activeTab: string;
  onTabChange: (_tab: string) => void;
}

export default function Sidebar({
  isOpen,
  activeTab,
  onTabChange,
}: SidebarProps) {
  const navigateTo = (route: string, newTab = false) => {
    const routes = {
      home: 'http://localhost:3000',
      manageCustomers: 'http://localhost:3001',
      viewCustomers: 'http://localhost:3002',
    };

    const url = routes[route as keyof typeof routes];

    if (url) {
      const userName = localStorage.getItem('userName');
      const finalUrl = userName
        ? `${url}?userName=${encodeURIComponent(userName)}`
        : url;

      if (newTab) {
        window.open(finalUrl, '_blank');
      } else {
        window.location.href = finalUrl;
      }
    }
  };

  const logout = () => {
    const confirmLogout = window.confirm(
      'Tem certeza que deseja sair?'
    );
    if (confirmLogout) {
      localStorage.clear();
      sessionStorage.clear();

      navigateTo('home');
    }
  };

  const handleNavigation = (tab: string, route?: string) => {
    if (route) {
      navigateTo(route, true);
    } else {
      onTabChange(tab);
    }
  };

  return (
    <aside
      className={`h-screen bg-gray-800 transition-all duration-300 overflow-hidden ${
        isOpen ? 'w-64' : 'w-0'
      }`}
    >
      <div className="min-w-64 bg-gray-800 text-white h-full flex flex-col">
        <div className="flex items-center justify-center bg-gray-200 p-8">
          <Logo width={100} height={50} />
        </div>

        <nav className="mt-8 flex-1">
          <div className="px-4 space-y-2">
            <button
              className="flex items-center w-full p-2 rounded hover:bg-gray-700 transition-colors"
              onClick={() => navigateTo('home', true)}
              title="Ir para página inicial"
            >
              <Home size={20} className="mr-3" />
              <span>Home</span>
            </button>

            <button
              className={`flex items-center w-full p-2 rounded transition-colors ${
                activeTab === 'Clientes'
                  ? 'bg-orange-500 text-white'
                  : 'hover:bg-gray-700'
              }`}
              onClick={() => navigateTo('manageCustomers', true)}
              title="Gerenciar clientes"
            >
              <Users size={20} className="mr-3" />
              <span>Clientes</span>
            </button>

            <button
              className={`flex items-center w-full p-2 rounded transition-colors ${
                activeTab === 'Clientes selecionados'
                  ? 'bg-orange-500 text-white'
                  : 'hover:bg-gray-700'
              }`}
              onClick={() =>
                handleNavigation('Clientes selecionados')
              }
              title="Ver clientes selecionados"
            >
              <UserCheck size={20} className="mr-3" />
              <span>Clientes selecionados</span>
            </button>
          </div>
        </nav>

        {/* Footer com botão Sair */}
        <div className="px-4 pb-4 border-t border-gray-700 pt-4">
          <button
            className="flex items-center w-full p-2 rounded hover:bg-gray-700 text-red-400 hover:text-red-300 transition-colors"
            onClick={logout}
            title="Sair do sistema"
          >
            <LogOut size={20} className="mr-3" />
            <span>Sair</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
