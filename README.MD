# Teddy - Projeto de Micro-frontends

Este projeto utiliza arquitetura de micro-frontends com Module Federation do Vite para criar aplicações modulares e independentes que podem ser desenvolvidas e implantadas separadamente.

## Estrutura do Projeto

```
teddy/
├── apps/                    # Aplicativos de micro-frontend
│   ├── entry-app/           # Aplicativo shell (ponto de entrada)
│   ├── manage-customers-app/ # Micro-frontend para gerenciar clientes
│   └── view-customers-app/   # Micro-frontend para visualizar clientes
├── packages/                # Bibliotecas compartilhadas
│   └── ui/                  # Componentes de UI compartilhados
└── config/                  # Configurações compartilhadas
    ├── tailwind/            # Configuração do Tailwind
    ├── postcss/             # Configuração do PostCSS
    ├── typescript/          # Configuração do TypeScript
    └── eslint/              # Configuração do ESLint
```

## Começando

Para iniciar o desenvolvimento:

1. Clone o repositório
2. Instale as dependências:
   ```
   npm install
   ```
3. Inicie todos os aplicativos:
   ```
   ./start-all.ps1
   ```

## Portas de Desenvolvimento

- **Entry App**: http://localhost:5173
- **Manage Customers App**: http://localhost:3001
- **View Customers App**: http://localhost:3002

## Arquitetura

Este projeto utiliza:

- **Module Federation**: Para compartilhar componentes e lógica entre micro-frontends
- **Workspaces**: Para gerenciar múltiplos pacotes em um único repositório
- **Configurações Compartilhadas**: Para manter consistência entre os aplicativos
