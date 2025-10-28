# Ambiente de Desenvolvimento Docker

Este documento explica como usar o ambiente de desenvolvimento Docker para a aplicação Strategy Analytics.

## Pré-requisitos

- Docker
- Docker Compose

## Arquivos criados

- `Dockerfile.dev` - Dockerfile otimizado para desenvolvimento
- `docker-compose.dev.yml` - Configuração do Docker Compose para desenvolvimento
- `.dockerignore` - Arquivos ignorados no build do Docker
- `dev-docker.sh` - Script para facilitar o gerenciamento do ambiente

## Como usar

### Usando o script de gerenciamento (recomendado)

```bash
# Iniciar ambiente de desenvolvimento
./dev-docker.sh start

# Parar ambiente
./dev-docker.sh stop

# Reiniciar ambiente
./dev-docker.sh restart

# Ver logs
./dev-docker.sh logs

# Acessar shell do container
./dev-docker.sh shell

# Limpar containers e volumes
./dev-docker.sh clean

# Instalar/atualizar dependências
./dev-docker.sh install
```

### Usando Docker Compose diretamente

```bash
# Iniciar em modo detached
docker-compose -f docker-compose.dev.yml up -d --build

# Iniciar com logs visíveis
docker-compose -f docker-compose.dev.yml up --build

# Parar
docker-compose -f docker-compose.dev.yml down

# Ver logs
docker-compose -f docker-compose.dev.yml logs -f
```

## Características do ambiente

- **Hot Reload**: As mudanças no código são refletidas automaticamente
- **Port Mapping**: A aplicação fica disponível em `http://localhost:9000`
- **Volume Persistente**: `node_modules` é mantido em um volume para melhor performance
- **Ambiente isolado**: Todas as dependências ficam dentro do container

## Troubleshooting

### Hot reload não funciona

Se o hot reload não estiver funcionando, tente:

```bash
./dev-docker.sh restart
```

### Problemas com dependências

Para reinstalar dependências:

```bash
./dev-docker.sh clean
./dev-docker.sh start
```

### Acessar shell para debug

```bash
./dev-docker.sh shell
```

## Estrutura do container

- **Imagem base**: Node.js 20 Alpine
- **Diretório de trabalho**: `/app`
- **Porta exposta**: 9000
- **Comando padrão**: `npm run dev`

## Variáveis de ambiente

- `NODE_ENV=development`
- `CHOKIDAR_USEPOLLING=true` (para melhor compatibilidade com hot reload)

## Performance

O ambiente usa:

- Volume nomeado para `node_modules` (melhor performance)
- Alpine Linux (imagem menor)
- Mount bind para código fonte (hot reload)
