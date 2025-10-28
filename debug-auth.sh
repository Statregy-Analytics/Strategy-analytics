#!/bin/bash

echo "🔧 Debug de Autenticação"
echo "========================"

echo ""
echo "1. 🌐 Testando frontend:"
curl -I http://localhost:9011 | head -1

echo ""
echo "2. 🔄 Testando proxy API:"
curl -I http://localhost:9011/api/clients | head -1

echo ""
echo "3. 📊 Dados de exemplo da API:"
SAMPLE_DATA=$(curl -s http://localhost:9011/api/clients | jq -r '.[0] | "CPF: \(.cliente.cpf), Senha: \(.password), Nome: \(.cliente.name)"')
echo "   $SAMPLE_DATA"

echo ""
echo "🎮 Como debugar o login:"
echo "   1. Abra o navegador em http://localhost:9011"
echo "   2. Abra o DevTools (F12) -> Console"
echo "   3. Tente fazer login e observe os logs:"
echo "      - 'Tentando autenticar com: ...'"
echo "      - 'Cliente encontrado: ...'"
echo "      - 'Cookies salvos: ...'"
echo "      - 'Router Debug: ...'"
echo ""
echo "🔍 Se ainda voltar para login, verifique:"
echo "   - Se os cookies estão sendo salvos"
echo "   - Se isAuthenticated() retorna true"
echo "   - Se hasTokenCookie está funcionando"