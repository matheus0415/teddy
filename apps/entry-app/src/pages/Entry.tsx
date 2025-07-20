import { useState } from 'react';

export default function Entry() {
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      console.log('Nome digitado:', name);
      // Salva o nome no localStorage para uso posterior
      const userName = name.trim();
      localStorage.setItem('userName', userName);

      // Log para verificar se foi salvo
      console.log(
        'Nome salvo no localStorage:',
        localStorage.getItem('userName')
      );

      // Pequeno delay para garantir que o localStorage foi salvo antes do redirecionamento
      setTimeout(() => {
        window.location.href = 'http://localhost:3001';
      }, 100);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-sm space-y-6">
        <h1 className="text-xl font-medium text-gray-900 text-center">
          Olá, seja bem-vindo!
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Digite o seu nome:"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-md text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />

          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-4 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}
