#!/bin/bash

echo "🔧 Testando integração Frontend + Backend"
echo "==========================================="

echo ""
echo "✅ 1. Testando Frontend (http://localhost:9011)"
FRONTEND_STATUS=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:9011)
if [ "$FRONTEND_STATUS" = "200" ]; then
    echo "   ✅ Frontend OK (Status: $FRONTEND_STATUS)"
else
    echo "   ❌ Frontend ERRO (Status: $FRONTEND_STATUS)"
fi

echo ""
echo "✅ 2. Testando Backend API (http://localhost:3333/api/clients)"
BACKEND_STATUS=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3333/api/clients)
if [ "$BACKEND_STATUS" = "200" ]; then
    echo "   ✅ Backend OK (Status: $BACKEND_STATUS)"
else
    echo "   ❌ Backend ERRO (Status: $BACKEND_STATUS)"
fi

echo ""
echo "✅ 3. Testando estrutura de dados do Backend"
BACKEND_DATA=$(curl -s http://localhost:3333/api/clients | jq '.[0] | has("cliente") and has("password")')
if [ "$BACKEND_DATA" = "true" ]; then
    echo "   ✅ Estrutura de dados OK (cliente e password presentes)"
else
    echo "   ❌ Estrutura de dados ERRO (campos esperados não encontrados)"
fi

echo ""
echo "🏁 Resumo:"
echo "   - Frontend: http://localhost:9011"
echo "   - Backend API: http://localhost:3333/api/clients"
echo "   - Autenticação: CPF + Senha"
echo ""
echo "💡 Para testar o login:"
echo "   1. Acesse: http://localhost:9011"
echo "   2. Use um CPF e senha válidos do backend"
echo "   3. O sistema irá buscar em /api/clients e validar"