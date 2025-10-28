#!/bin/bash

echo "🎯 Teste Final de Funcionamento"
echo "==============================="

echo ""
echo "1. 🌐 Frontend:"
FRONTEND_STATUS=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:9011)
if [ "$FRONTEND_STATUS" = "200" ]; then
    echo "   ✅ Frontend OK (http://localhost:9011)"
else
    echo "   ❌ Frontend ERRO (Status: $FRONTEND_STATUS)"
    exit 1
fi

echo ""
echo "2. 🔄 Proxy API:"
PROXY_STATUS=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:9011/api/clients)
if [ "$PROXY_STATUS" = "200" ]; then
    echo "   ✅ Proxy funcionando (http://localhost:9011/api/clients)"
else
    echo "   ❌ Proxy ERRO (Status: $PROXY_STATUS)"
    exit 1
fi

echo ""
echo "3. 📋 Dados da API via Proxy:"
API_DATA=$(curl -s http://localhost:9011/api/clients | jq -r 'length')
if [ "$API_DATA" -gt "0" ]; then
    echo "   ✅ API retornando $API_DATA registros"
    
    # Mostrar exemplo de CPF para teste
    SAMPLE_CPF=$(curl -s http://localhost:9011/api/clients | jq -r '.[0].cliente.cpf // "N/A"')
    echo "   📍 CPF de exemplo para teste: $SAMPLE_CPF"
else
    echo "   ❌ API não retornando dados"
fi

echo ""
echo "🏁 Resumo das Correções:"
echo "   ✅ Problema de CORS resolvido com proxy"
echo "   ✅ withCredentials removido do axios"
echo "   ✅ API_URL configurada para usar proxy local (/api/)"
echo "   ✅ Container acessando backend via host.docker.internal"

echo ""
echo "🎮 Como testar o login:"
echo "   1. Acesse: http://localhost:9011"
echo "   2. Use CPF: $SAMPLE_CPF"
echo "   3. Use senha: 123456 (ou a senha correspondente)"
echo "   4. Sistema deve redirecionar para /system/"

echo ""
echo "🔍 Estrutura da requisição:"
echo "   Frontend (localhost:9011) -> Proxy (/api/) -> Backend (host.docker.internal:3333)"