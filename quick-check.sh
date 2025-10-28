#!/bin/bash

echo "🔧 Verificação Rápida de Funcionamento"
echo "======================================"

# Verificar se o container está rodando
echo "📦 1. Verificando container..."
CONTAINER_STATUS=$(docker-compose -f docker-compose.dev.yml ps --services --filter "status=running")
if [ -n "$CONTAINER_STATUS" ]; then
    echo "   ✅ Container rodando"
else
    echo "   ❌ Container não está rodando"
    exit 1
fi

# Verificar se o frontend responde
echo "🌐 2. Verificando frontend..."
FRONTEND_RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:9011)
if [ "$FRONTEND_RESPONSE" = "200" ]; then
    echo "   ✅ Frontend acessível (http://localhost:9011)"
else
    echo "   ❌ Frontend não acessível (Status: $FRONTEND_RESPONSE)"
fi

# Verificar se o backend responde
echo "🔌 3. Verificando backend..."
BACKEND_RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3333/api/clients)
if [ "$BACKEND_RESPONSE" = "200" ]; then
    echo "   ✅ Backend acessível (http://localhost:3333/api/clients)"
else
    echo "   ❌ Backend não acessível (Status: $BACKEND_RESPONSE)"
fi

# Verificar se há erros nos logs
echo "📋 4. Verificando logs de erro..."
ERROR_COUNT=$(docker-compose -f docker-compose.dev.yml logs --tail=50 | grep -i "error\|failed\|exception" | wc -l)
if [ "$ERROR_COUNT" -eq "0" ]; then
    echo "   ✅ Nenhum erro crítico encontrado"
else
    echo "   ⚠️ Encontrados $ERROR_COUNT possíveis erros nos logs"
fi

echo ""
echo "🎯 Resumo dos Problemas Corrigidos:"
echo "   ✅ Erro 'auth is not defined' - Removido import e referência desnecessária"
echo "   ✅ Erro de fonte Roboto - Comentado para evitar problemas de carregamento"
echo "   ✅ Configuração de autenticação - Usando useClientAuth.js personalizado"
echo "   ✅ API URL - Configurada para http://host.docker.internal:3333/api/"
echo ""
echo "🚀 Próximos passos:"
echo "   1. Acesse: http://localhost:9011"
echo "   2. Teste o login com CPF: 398.780.438-60 e senha: 123456"
echo "   3. Verifique se redireciona para /system/"