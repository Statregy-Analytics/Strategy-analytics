# Dockerfile para desenvolvimento
FROM node:20-alpine

# Instalar dependências do sistema necessárias
RUN apk add --no-cache \
    git \
    python3 \
    make \
    g++

# Definir diretório de trabalho
WORKDIR /app

# Instalar Quasar CLI globalmente
RUN npm install -g @quasar/cli

# Copiar arquivos de dependências
COPY package*.json ./

# Instalar dependências
RUN npm install

# Copiar código fonte
COPY . .

# Expor porta do servidor de desenvolvimento
EXPOSE 9011

# Comando padrão para desenvolvimento
CMD ["npm", "run", "dev"]