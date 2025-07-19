# Etapa 1 - Build com Vite
FROM node:20-alpine AS builder

WORKDIR /app

# Copiar arquivos do monorepo
COPY package*.json ./
COPY apps/view-customers-app ./apps/view-customers-app/
COPY config ./config/
COPY packages ./packages/

# Instalar dependências na raiz e construir o app
RUN npm install && npm run build -w apps/view-customers-app

# Etapa 2 - Servir com NGINX
FROM nginx:alpine

# Remove configuração default
RUN rm -rf /etc/nginx/conf.d

# Adiciona nova config
COPY apps/view-customers-app/nginx.conf /etc/nginx/conf.d/default.conf

# Copia os arquivos da build Vite
COPY ./apps/view-customers-app/dist /usr/share/nginx/html
