#!/bin/bash

echo "🔄 Reiniciando ambiente de desenvolvimento..."

# Parar containers
echo "📦 Parando containers existentes..."
docker-compose -f docker-compose.dev.yml down

# Remover containers órfãos
echo "🧹 Limpando containers órfãos..."
docker-compose -f docker-compose.dev.yml down --remove-orphans

# Rebuild e start
echo "🚀 Reconstruindo e iniciando containers..."
docker-compose -f docker-compose.dev.yml up --build -d

echo "✅ Ambiente reiniciado!"
echo "📡 Frontend disponível em: http://localhost:9011"
echo "📋 Para ver os logs: docker-compose -f docker-compose.dev.yml logs -f"