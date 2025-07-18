# Etapa 1 - Build com Vite
FROM node:20-alpine AS builder

WORKDIR /app
COPY . .
RUN npm install && npm run build

# Etapa 2 - Servir com NGINX
FROM nginx:alpine

# Remove configuração default
RUN rm -rf /etc/nginx/conf.d

# Adiciona nova config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copia os arquivos da build Vite
COPY --from=builder /app/dist /usr/share/nginx/html
