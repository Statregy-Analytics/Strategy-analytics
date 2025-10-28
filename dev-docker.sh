#!/bin/bash

# Script para gerenciar o ambiente de desenvolvimento Docker

# Aumenta timeout do docker-compose para evitar erros "Read timed out" em redes lentas
# Pode ser sobrescrito no ambiente se necessário
COMPOSE_HTTP_TIMEOUT=${COMPOSE_HTTP_TIMEOUT:-300}
export COMPOSE_HTTP_TIMEOUT
# Timeout do cliente Docker (algumas versões utilizam esta var)
DOCKER_CLIENT_TIMEOUT=${DOCKER_CLIENT_TIMEOUT:-300}
export DOCKER_CLIENT_TIMEOUT

# --- Remoção automática de container conflituante (opcional) -----------------
# O nome do container pode ser fornecido via variável de ambiente CONTAINER_NAME.
# Caso não esteja setada, tentamos extrair `container_name` do serviço `frontend`
# em `docker-compose.dev.yml`.
CONTAINER_NAME=${CONTAINER_NAME:-}
if [ -z "$CONTAINER_NAME" ] && [ -f docker-compose.dev.yml ]; then
  # busca o bloco 'frontend:' e depois a linha 'container_name:' dentro dele
  CONTAINER_NAME=$(awk 'BEGIN{f=0} {g=$1; if(g=="frontend:") f=1; if(f && g=="container_name:") {print $2; exit}}' docker-compose.dev.yml)
fi

if [ -n "$CONTAINER_NAME" ]; then
  # procura container com nome exatamente igual e obtém seu ID
  existing_id=$(docker ps -a --format '{{.ID}} {{.Names}}' | awk -v name="$CONTAINER_NAME" '$2==name {print $1; exit}') || true
  if [ -n "$existing_id" ]; then
    echo "⚠️  Container com nome '$CONTAINER_NAME' já existe (ID: $existing_id). Removendo..."
    docker rm -f "$existing_id" || echo "Falha ao remover container $existing_id; prosseguindo..."
  fi
fi

case "$1" in
  "start")
    echo "🚀 Iniciando ambiente de desenvolvimento..."
    docker-compose -f docker-compose.dev.yml up -d --build
    ;;
  "stop")
    echo "🛑 Parando ambiente de desenvolvimento..."
    docker-compose -f docker-compose.dev.yml down
    ;;
  "restart")
    echo "🔄 Reiniciando ambiente de desenvolvimento..."
    docker-compose -f docker-compose.dev.yml down
    docker-compose -f docker-compose.dev.yml up -d --build
    ;;
  "logs")
    echo "📋 Visualizando logs..."
    docker-compose -f docker-compose.dev.yml logs -f
    ;;
  "shell")
    echo "💻 Acessando shell do container..."
    docker-compose -f docker-compose.dev.yml exec frontend sh
    ;;
  "clean")
    echo "🧹 Limpando containers e volumes..."
    docker-compose -f docker-compose.dev.yml down -v
    docker system prune -f
    ;;
  "install")
    echo "📦 Instalando dependências..."
    docker-compose -f docker-compose.dev.yml exec frontend npm install
    ;;
  *)
    echo "Uso: $0 {start|stop|restart|logs|shell|clean|install}"
    echo ""
    echo "Comandos disponíveis:"
    echo "  start    - Inicia o ambiente de desenvolvimento"
    echo "  stop     - Para o ambiente de desenvolvimento"
    echo "  restart  - Reinicia o ambiente de desenvolvimento"
    echo "  logs     - Mostra os logs do container"
    echo "  shell    - Acessa o shell do container"
    echo "  clean    - Remove containers e volumes"
    echo "  install  - Instala/atualiza dependências"
    exit 1
    ;;
esac