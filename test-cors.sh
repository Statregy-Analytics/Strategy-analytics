#!/bin/bash

echo "🔧 Teste de CORS e Conectividade"
echo "================================="

echo ""
echo "1. 🌐 Testando acesso direto ao backend (do host):"
BACKEND_STATUS=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3333/api/clients)
if [ "$BACKEND_STATUS" = "200" ]; then
    echo "   ✅ Backend OK no host (Status: $BACKEND_STATUS)"
else
    echo "   ❌ Backend ERRO no host (Status: $BACKEND_STATUS)"
fi

echo ""
echo "2. 🐳 Testando acesso do container ao backend:"
CONTAINER_ACCESS=$(docker-compose -f docker-compose.dev.yml exec frontend wget -q --spider http://host.docker.internal:3333/api/clients && echo "OK" || echo "ERRO")
if [ "$CONTAINER_ACCESS" = "OK" ]; then
    echo "   ✅ Container consegue acessar o backend"
else
    echo "   ❌ Container NÃO consegue acessar o backend"
fi

echo ""
echo "3. 🔗 Testando headers CORS do backend:"
CORS_HEADERS=$(curl -s -I http://localhost:3333/api/clients | grep -i "access-control")
if [ -n "$CORS_HEADERS" ]; then
    echo "   ✅ Headers CORS encontrados:"
    echo "$CORS_HEADERS" | sed 's/^/      /'
else
    echo "   ⚠️ Nenhum header CORS encontrado no backend"
fi

echo ""
echo "4. 📋 Verificando configuração do frontend:"
API_URL_VAR=$(docker-compose -f docker-compose.dev.yml exec frontend printenv API_URL)
echo "   📍 API_URL configurada: $API_URL_VAR"

echo ""
echo "5. 🚀 Status dos serviços:"
echo "   Frontend: http://localhost:9011"
echo "   Backend:  http://localhost:3333/api/clients"

echo ""
echo "💡 Se ainda houver erro de CORS:"
echo "   - O backend precisa configurar headers CORS"
echo "   - Ou usar um proxy no frontend"
echo "   - Verificar se o backend aceita requisições de http://localhost:9011"