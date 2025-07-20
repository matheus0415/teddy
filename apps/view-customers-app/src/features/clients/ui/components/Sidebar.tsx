import { Home, UserCheck, Users, LogOut } from 'lucide-react';
import Logo from '../../../../components/icons/Logo';

interface SidebarProps {
  isOpen: boolean;
}

export default function Sidebar({ isOpen }: SidebarProps) {
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
            <button className="flex items-center w-full p-2 rounded hover:bg-gray-700">
              <Home size={20} className="mr-3" />
              <span>Home</span>
            </button>
            <button className="flex items-center w-full p-2 rounded hover:bg-gray-700">
              <Users size={20} className="mr-3" />
              <span>Clientes</span>
            </button>
            <button className="flex items-center w-full p-2 rounded bg-orange-500 text-white">
              <UserCheck size={20} className="mr-3" />
              <span>Clientes selecionados</span>
            </button>
          </div>
        </nav>

        {/* Footer com botão Sair */}
        <div className="px-4 pb-4 border-t border-gray-700 pt-4">
          <button className="flex items-center w-full p-2 rounded hover:bg-gray-700 text-red-400 hover:text-red-300">
            <LogOut size={20} className="mr-3" />
            <span>Sair</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
