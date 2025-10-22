# Dockerfile
FROM node:22-alpine as builder

WORKDIR /app

# Copiar arquivos de package
COPY package*.json ./

# Instalar Quasar CLI e dependências
RUN npm install -g @quasar/cli
RUN npm install

# Copiar projeto
COPY . .

# Build do projeto
RUN npx quasar build -m spa

# Stage 2 - Serve with Nginx
FROM nginx:alpine

# Remover configuração padrão do nginx
RUN rm -rf /etc/nginx/conf.d/*

# Copiar arquivos buildados e configuração nginx
COPY --from=builder /app/dist/spa /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

# Verificar se a configuração nginx é válida
RUN nginx -t

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
