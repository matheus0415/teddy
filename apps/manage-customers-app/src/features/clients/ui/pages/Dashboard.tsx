import { useState, useEffect, useCallback, useMemo } from 'react';
import { Plus, Edit, Trash2, Menu, User } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../store/hooks';
import { getClientRequest } from '../../presentation/redux/actions/get-client-actions';
import type { Client } from '../../domain/models/client';
import Sidebar from '../components/Sidebar';
import Logo from '../../../../components/icons/Logo';

export default function Dashboard() {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const {
    clients: allClients,
    totalPages,
    loading,
    error,
  } = useAppSelector((state) => state.clients);

  const [activeTab, setActiveTab] = useState('Clientes');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [userName, setUserName] = useState('Usuário');

  const currentPageFromUrl = parseInt(
    searchParams.get('page') || '1',
    10
  );
  const limitFromUrl = parseInt(
    searchParams.get('limit') || '10',
    10
  );

  const [itemsPerPage, setItemsPerPage] = useState(limitFromUrl);

  useEffect(() => {
    setItemsPerPage(limitFromUrl);
  }, [limitFromUrl]);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  useEffect(() => {
    const pageToFetch = currentPageFromUrl - 1;
    dispatch(
      getClientRequest({ page: pageToFetch, limit: limitFromUrl })
    );
  }, [dispatch, currentPageFromUrl, limitFromUrl]);

  useEffect(() => {
    const savedName = localStorage.getItem('userName');
    if (savedName) {
      setUserName(savedName);
    }
  }, []);

  const handleItemsPerPageChange = useCallback(
    (newItemsPerPage: number) => {
      setSearchParams({
        page: '1',
        limit: newItemsPerPage.toString(),
      });
    },
    [setSearchParams]
  );

  const clients = allClients;

  const getVisiblePages = useMemo(() => {
    const pages = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      if (currentPageFromUrl > 4) {
        pages.push('...');
      }

      const start = Math.max(2, currentPageFromUrl - 1);
      const end = Math.min(totalPages - 1, currentPageFromUrl + 1);

      for (let i = start; i <= end; i++) {
        if (!pages.includes(i)) {
          pages.push(i);
        }
      }

      if (currentPageFromUrl < totalPages - 3) {
        pages.push('...');
      }

      if (!pages.includes(totalPages)) {
        pages.push(totalPages);
      }
    }

    return pages;
  }, [totalPages, currentPageFromUrl]);

  const handlePageChange = useCallback(
    (page: number) => {
      const newParams = new URLSearchParams(searchParams);
      newParams.set('page', page.toString());
      setSearchParams(newParams);
    },
    [searchParams, setSearchParams]
  );

  const ClientCard = useCallback(
    ({ client }: { client: Client }) => (
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
    ),
    []
  );

  const LoadingSkeleton = useCallback(
    () => (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        {Array.from({ length: itemsPerPage }).map((_, index) => (
          <div
            key={index}
            className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 animate-pulse"
          >
            <div className="text-center">
              <div className="h-6 bg-gray-200 rounded mb-2"></div>
              <div className="space-y-2 mb-3">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
              </div>
              <div className="flex justify-between items-center">
                <div className="w-8 h-8 bg-gray-200 rounded"></div>
                <div className="w-8 h-8 bg-gray-200 rounded"></div>
                <div className="w-8 h-8 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    ),
    [itemsPerPage]
  );

  const ErrorMessage = useCallback(
    ({ error }: { error: string }) => (
      <div className="flex flex-col justify-center items-center h-64 bg-red-50 rounded-lg border border-red-200">
        <div className="text-red-500 text-6xl mb-4">⚠️</div>
        <h2 className="text-xl font-semibold text-red-700 mb-2">
          Oops! Algo deu errado
        </h2>
        <p className="text-red-600 mb-4">{error}</p>
        <button
          onClick={() => setSearchParams({ page: '1', limit: '10' })}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
        >
          Tentar novamente
        </button>
      </div>
    ),
    [setSearchParams]
  );

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <div
        className={`transition-all duration-300 ease-in-out ${
          sidebarOpen ? 'w-64' : 'w-0'
        }`}
      >
        <Sidebar isOpen={sidebarOpen} />
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
          {loading && <LoadingSkeleton />}

          {error && <ErrorMessage error={error} />}

          {!loading && !error && (
            <>
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-base font-semibold text-gray-900">
                  <span className="font-bold">
                    {allClients.length}
                  </span>{' '}
                  clientes encontrados:
                </h1>
                <div className="text-sm text-gray-600 flex items-center space-x-2">
                  <span>Clientes por página:</span>
                  <select
                    value={itemsPerPage}
                    onChange={(e) =>
                      handleItemsPerPageChange(Number(e.target.value))
                    }
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

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                {clients.map((client: Client) => (
                  <ClientCard key={client.id} client={client} />
                ))}
              </div>

              <div className="mb-6">
                <button className="w-full border-2 border-dashed border-orange-300 text-orange-500 py-3 rounded-lg hover:border-orange-400 hover:bg-orange-50 transition-colors">
                  Criar cliente
                </button>
              </div>

              <div className="flex justify-center space-x-2">
                {getVisiblePages.map((page, index) => {
                  if (page === '...') {
                    return (
                      <span
                        key={`ellipsis-${index}`}
                        className="px-3 py-2 text-gray-400"
                      >
                        ...
                      </span>
                    );
                  }

                  const pageNum = page as number;
                  return (
                    <button
                      key={pageNum}
                      className={`px-3 py-2 rounded transition-colors ${
                        currentPageFromUrl === pageNum
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
            </>
          )}
        </main>
      </div>
    </div>
  );
}
