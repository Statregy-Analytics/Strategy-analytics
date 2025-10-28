#!/bin/bash

# Script para gerenciar o ambiente de desenvolvimento Docker

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