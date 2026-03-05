# Resumo do projeto

## Visão geral

`strategy-analytics` é um frontend SPA em **Vue 3 + Quasar (Vite)** para a Strategy Analytics.

O produto é dividido em duas áreas:

1. **Site público**: landing e páginas institucionais.
2. **Sistema logado**: carteira, depósitos, relatórios, clientes e administração.

## Stack e estrutura

- Framework UI: `quasar` 2.x
- Frontend: `vue` 3.x
- Roteamento: `vue-router` 4.x
- Estado global: `pinia`
- HTTP: `axios`
- Gráficos/calendário: `apexcharts`, `fullcalendar`, `v-calendar`

Arquivos de referência:

- Configuração do app: `quasar.config.js`
- Dependências/scripts: `package.json`
- Entrada visual: `src/App.vue`
- Rotas: `src/router/routes.js`
- Guarda de navegação: `src/router/index.js`

## Arquitetura de rotas

### Público

Rotas sob layout `src/layouts/MainLayout.vue` com páginas em `src/pages/*`.

### Sistema autenticado

Rotas sob `src/system/layouts/MainLayout.vue`, com `meta.auth`.

Pontos principais:

- Login/registro em `src/system/pages/*`
- Área `/system/dashboard` usa `src/system/views/WalletView.vue`
- Página inicial do dashboard é `src/system/pages/WalletPage.vue`

Observação importante:

- `src/system/pages/DashboardPage.vue` existe, mas **não está conectada** na rota atual do dashboard.

## Autenticação e sessão

- Cliente HTTP em `src/boot/axios.js`
- Fluxo de auth em `src/composables/system/useAuth.js`
- Persistência via cookies em `src/composables/useCookies.js`

O sistema usa:

- Token em cookie (`SA_token` por padrão)
- Dados do usuário em cookie (`SA_user`)
- Guardas por autenticação e por tipo de usuário (`allowedTypes`)

## Estado global (Pinia)

Stores principais:

- `src/stores/user`: usuário logado, carteira, permissões e dados de sessão
- `src/stores/layout`: estado visual responsivo/dashboard
- `src/stores/layoutStore`: tema e componentes de layout
- `src/stores/deposit`, `src/stores/report`, `src/stores/investments`: domínios específicos

## Fluxo de carteira (cliente)

Tela principal:

- `src/system/pages/WalletPage.vue`
- `src/system/layouts/wallet/BalancecurrentLayout.vue`

Origem dos dados:

- API `GET users/wallet` via `src/composables/system/Requests/useDataUser.js`

Indicadores financeiros usados na interface:

- **Patrimônio investido**: `current_investment`
- **Disponível para investir**: `current_balance`
- **Carteira**: `current_investment + current_balance`
- **Investimentos**: valor investido convertido por câmbio (`current_loan`, fallback `5.5`)

## Fluxo admin de clientes

Tela:

- `src/system/pages/ClientsPage.vue`
- Lista de clientes: `src/system/layouts/control/clients/ListclientLayout.vue`

Ação “Ver rendimentos” abre:

- `src/system/layouts/control/clients/IncomeControlClientsLayout.vue`

Esse modal agora também exibe os 4 indicadores financeiros (mesma semântica da área do cliente):

- Patrimônio investido
- Disponível para investir
- Carteira
- Investimentos

Comportamento de fallback implementado:

- Prioriza `client.user_wallet`
- Se faltar, usa campos do item selecionado na tabela (`props.user`)

## Padrões e riscos conhecidos

- Projeto frontend-only neste repositório (consome API externa)
- Há uso misto de formatação de moeda entre filtros globais e helpers locais
- Lint atualmente com incompatibilidade entre configuração antiga (`.eslintrc.cjs`) e execução com ESLint v9

## Execução local

- Instalar dependências: `npm install`
- Rodar em dev: `npm run dev`
- Build: `npm run build`
