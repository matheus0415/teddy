# Etapa 1 - Build com Vite
FROM node:20-alpine AS builder

WORKDIR /app

# Copiar arquivos do monorepo
COPY package*.json ./
COPY apps/entry-app ./apps/entry-app/
COPY config ./config/
COPY packages ./packages/

# Instalar dependências na raiz e construir o app
RUN npm install && npm run build -w apps/entry-app

# Etapa 2 - Servir com NGINX
FROM nginx:alpine

# Remove configuração default
RUN rm -rf /etc/nginx/conf.d

# Adiciona nova config
COPY apps/entry-app/nginx.conf /etc/nginx/conf.d/default.conf

# Copia os arquivos da build Vite da etapa anterior
COPY --from=builder /app/apps/entry-app/dist /usr/share/nginx/html

EXPOSE 80
