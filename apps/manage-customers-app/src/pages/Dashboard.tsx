import { useState } from 'react';
import {
  Home,
  Users,
  UserCheck,
  Plus,
  Edit,
  Trash2,
  Menu,
} from 'lucide-react';

interface Client {
  id: number;
  name: string;
  salary: string;
  company: string;
}

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('Clientes');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_currentPage, _setCurrentPage] = useState(4);

  // Mock data - all clients named Eduardo as shown in the image
  const clients: Client[] = Array.from({ length: 16 }, (_, i) => ({
    id: i + 1,
    name: 'Eduardo',
    salary: 'R$3.500,00',
    company: 'R$120.000,00',
  }));

  const ClientCard = ({ client }: { client: Client }) => (
    <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
      <div className="text-center space-y-2">
        <h3 className="font-semibold text-gray-900">{client.name}</h3>
        <div className="text-sm text-gray-600">
          <p>Salário: {client.salary}</p>
          <p>Empresa: {client.company}</p>
        </div>
        <div className="flex justify-center space-x-2 pt-2">
          <button className="p-1 text-gray-500 hover:text-orange-500">
            <Plus size={16} />
          </button>
          <button className="p-1 text-gray-500 hover:text-orange-500">
            <Edit size={16} />
          </button>
          <button className="p-1 text-gray-500 hover:text-red-500">
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white">
        <div className="p-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-orange-500 rounded flex items-center justify-center">
              <span className="text-white font-bold text-sm">T</span>
            </div>
            <span className="font-semibold">teddy</span>
          </div>
        </div>

        <nav className="mt-8">
          <div className="px-4 space-y-2">
            <button className="flex items-center space-x-3 w-full p-2 rounded hover:bg-gray-700">
              <Home size={20} />
              <span>Home</span>
            </button>
            <button className="flex items-center space-x-3 w-full p-2 rounded bg-orange-500 text-white">
              <Users size={20} />
              <span>Clientes</span>
            </button>
            <button className="flex items-center space-x-3 w-full p-2 rounded hover:bg-gray-700">
              <UserCheck size={20} />
              <span>Clientes selecionados</span>
            </button>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <button className="p-2">
                <Menu size={20} />
              </button>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-orange-500 rounded flex items-center justify-center">
                  <span className="text-white font-bold text-sm">
                    T
                  </span>
                </div>
                <span className="font-semibold text-gray-900">
                  teddy
                </span>
                <span className="text-xs text-gray-500">FINANCE</span>
              </div>
              <nav className="flex space-x-6">
                <button
                  className={`pb-2 border-b-2 ${
                    activeTab === 'Clientes'
                      ? 'border-orange-500 text-orange-500'
                      : 'border-transparent text-gray-600'
                  }`}
                  onClick={() => setActiveTab('Clientes')}
                >
                  Clientes
                </button>
                <button
                  className={`pb-2 border-b-2 ${
                    activeTab === 'Clientes selecionados'
                      ? 'border-orange-500 text-orange-500'
                      : 'border-transparent text-gray-600'
                  }`}
                  onClick={() =>
                    setActiveTab('Clientes selecionados')
                  }
                >
                  Clientes selecionados
                </button>
                <button
                  className={`pb-2 border-b-2 ${
                    activeTab === 'Sair'
                      ? 'border-orange-500 text-orange-500'
                      : 'border-transparent text-gray-600'
                  }`}
                  onClick={() => setActiveTab('Sair')}
                >
                  Sair
                </button>
              </nav>
            </div>
            <div className="text-gray-600">
              Olá, <span className="font-semibold">Usuário!</span>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-lg font-semibold text-gray-900">
              <span className="font-bold">16</span> clientes
              encontrados:
            </h1>
            <div className="text-sm text-gray-600">
              Clientes por página:{' '}
              <span className="font-semibold">16</span>
            </div>
          </div>

          {/* Client Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {clients.map((client) => (
              <ClientCard key={client.id} client={client} />
            ))}
          </div>

          {/* Create Client Button */}
          <div className="mb-6">
            <button className="w-full border-2 border-dashed border-orange-300 text-orange-500 py-3 rounded-lg hover:border-orange-400 hover:bg-orange-50 transition-colors">
              Criar cliente
            </button>
          </div>

          {/* Pagination */}
          <div className="flex justify-center space-x-2">
            <button className="px-3 py-2 text-gray-600 hover:text-gray-900">
              1
            </button>
            <span className="px-3 py-2 text-gray-400">...</span>
            <button className="px-3 py-2 text-gray-600 hover:text-gray-900">
              3
            </button>
            <button className="px-3 py-2 bg-orange-500 text-white rounded">
              4
            </button>
            <button className="px-3 py-2 text-gray-600 hover:text-gray-900">
              5
            </button>
            <span className="px-3 py-2 text-gray-400">...</span>
            <button className="px-3 py-2 text-gray-600 hover:text-gray-900">
              12
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}
