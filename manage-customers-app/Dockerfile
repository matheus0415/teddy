# Etapa 1: Build
FROM node:20-alpine AS builder

WORKDIR /app

COPY . .

RUN npm install && npm run build

# Etapa 2: Servir com Nginx
FROM nginx:alpine

# Remove a configuração padrão do Nginx
RUN rm -rf /etc/nginx/conf.d

# Copia a build gerada para a pasta pública do Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Exponha a porta padrão do Nginx
EXPOSE 80

# Inicia o Nginx em primeiro plano
CMD ["nginx", "-g", "daemon off;"]
