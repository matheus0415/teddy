# Etapa 1: build com Vite
FROM node:20-alpine AS builder

WORKDIR /app
COPY . .
RUN npm install && npm run build

# Etapa 2: servir com nginx
FROM nginx:alpine

# Remover conf padrão
RUN rm -rf /etc/nginx/conf.d

# Adicionar nova config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copiar arquivos estáticos do Vite
COPY --from=builder /app/dist /usr/share/nginx/html
