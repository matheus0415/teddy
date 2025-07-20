import { useState } from 'react';
import { Plus, Edit, Trash2, Menu, User } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import Logo from '../components/icons/logo';

interface Client {
  id: number;
  name: string;
  salary: string;
  company: string;
}

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('Clientes');
  const [currentPage, setCurrentPage] = useState(4);
  const [itemsPerPage, setItemsPerPage] = useState(15);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  // Mock data - all clients named Eduardo as shown in the image
  const allClients: Client[] = Array.from({ length: 192 }, (_, i) => ({
    id: i + 1,
    name: 'Eduardo',
    salary: 'R$3.500,00',
    company: 'R$120.000,00',
  }));

  const totalPages = Math.ceil(allClients.length / itemsPerPage);
  
  // Handle items per page change
  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1); // Reset to first page when changing items per page
  };
  
  // Get current page items
  const getCurrentPageClients = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return allClients.slice(startIndex, endIndex);
  };

  const clients = getCurrentPageClients();

  // Pagination logic
  const getVisiblePages = () => {
    const pages = [];
    
    if (totalPages <= 7) {
      // Show all pages if 7 or fewer
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);
      
      if (currentPage > 4) {
        pages.push('...');
      }
      
      // Show pages around current page
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      
      for (let i = start; i <= end; i++) {
        if (!pages.includes(i)) {
          pages.push(i);
        }
      }
      
      if (currentPage < totalPages - 3) {
        pages.push('...');
      }
      
      // Always show last page
      if (!pages.includes(totalPages)) {
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const ClientCard = ({ client }: { client: Client }) => (
    <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
      <div className="text-center">
        <h3 className="font-semibold text-lg text-gray-900 mb-2">
          {client.name}
        </h3>
        <div className="text-sm text-gray-600 space-y-1 mb-3">
          <p>Salário: {client.salary}</p>
          <p>Empresa: {client.company}</p>
        </div>
        <div className="flex justify-between items-center">
          <button className="p-2 text-gray-500 hover:text-orange-500 hover:bg-orange-50 rounded">
            <Plus size={16} />
          </button>
          <button className="p-2 text-gray-500 hover:text-blue-500 hover:bg-blue-50 rounded">
            <Edit size={16} />
          </button>
          <button className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded">
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar - fixed width container to prevent layout shifts */}
      <div
        className={`transition-all duration-300 ease-in-out ${
          sidebarOpen ? 'w-64' : 'w-0'
        }`}
      >
        <Sidebar isOpen={sidebarOpen} />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col transition-all duration-300">
        {/* Header */}
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

            {/* Navigation Tabs */}
            <div className="flex-1 flex justify-center">
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
                  onClick={() =>
                    setActiveTab('Clientes selecionados')
                  }
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
            </div>

            <div className="text-gray-600 text-sm flex items-center space-x-2">
              <span>
                Olá, <span className="font-semibold">Usuário!</span>
              </span>
              <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                <User size={16} className="text-gray-600" />
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-base font-semibold text-gray-900">
              <span className="font-bold">{allClients.length}</span> clientes
              encontrados:
            </h1>
            <div className="text-sm text-gray-600 flex items-center space-x-2">
              <span>Clientes por página:</span>
              <select
                value={itemsPerPage}
                onChange={(e) => handleItemsPerPageChange(Number(e.target.value))}
                className="font-semibold bg-white border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={15}>15</option>
                <option value={20}>20</option>
                <option value={25}>25</option>
                <option value={30}>30</option>
                <option value={35}>35</option>
                <option value={40}>40</option>
              </select>
            </div>
          </div>

          {/* Client Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
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
            {getVisiblePages().map((page, index) => {
              if (page === '...') {
                return (
                  <span key={`ellipsis-${index}`} className="px-3 py-2 text-gray-400">
                    ...
                  </span>
                );
              }
              
              const pageNum = page as number;
              return (
                <button
                  key={pageNum}
                  className={`px-3 py-2 rounded transition-colors ${
                    currentPage === pageNum
                      ? 'bg-orange-500 text-white'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                  onClick={() => handlePageChange(pageNum)}
                >
                  {pageNum}
                </button>
              );
            })}
          </div>
        </main>
      </div>
    </div>
  );
}
