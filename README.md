# Tasker API

API REST para gerenciamento de usuários, tarefas e categorias, construída com **Node.js**, **TypeScript**, **Express** e **Prisma**.

## Visão geral

O projeto oferece:
- Cadastro e autenticação de usuários
- CRUD de tarefas
- Marcação de tarefa como concluída/não concluída
- CRUD de categorias
- Persistência em banco SQLite via Prisma

## Stack

- Node.js
- TypeScript
- Express
- Prisma ORM
- SQLite
- Zod (validação)
- JWT (autenticação)
- Bcrypt (hash de senha)

## Estrutura de pastas

```txt
src/
  errors/                 # Classes de erro de domínio
  https/
    controllers/          # Rotas e controllers (user, task, category)
    middlewares/          # Middlewares de autenticação
  prisma/                 # Cliente Prisma
  use-cases/              # Regras de negócio
prisma/
  migrations/             # Migrations do banco
  schema.prisma           # Modelagem de dados
```

## Modelagem de dados

### User
- `id` (uuid)
- `username`
- `email` (único)
- `password` (hash)
- `created_at`
- `updated_at`

### Category
- `id` (uuid)
- `name`
- `user_id` (relacionamento com User)

### Task
- `id` (uuid)
- `title`
- `description`
- `finished` (boolean)
- `created_at`
- `updated_at`
- `user_id` (relacionamento com User)
- `category_id` (opcional)

## Pré-requisitos

- Node.js 18+
- npm

## Instalação

```bash
npm install
```

## Configuração

Crie um arquivo `.env` na raiz:

```env
DATABASE_URL="file:./dev.db"
```

> Observação: o segredo JWT está fixo no código (`"senha"`).

## Banco de dados

Aplicar migrations:

```bash
npx prisma migrate dev
```

Gerar cliente Prisma (se necessário):

```bash
npx prisma generate
```

## Executando o projeto

Modo desenvolvimento:

```bash
npm run dev
```

A API sobe em:

```txt
http://localhost:3333
```

## Scripts disponíveis

- `npm run dev`: inicia a API com nodemon

## Endpoints

### Usuário (`/user`)

- `POST /user` — cria usuário
  - body:
    ```json
    {
      "username": "string",
      "email": "string",
      "password": "string (mínimo 6)"
    }
    ```

- `POST /user/auth` — autentica usuário
  - body:
    ```json
    {
      "email": "string",
      "password": "string"
    }
    ```
  - resposta:
    ```json
    {
      "user": {},
      "token": "jwt"
    }
    ```

### Tarefas (`/task`)

- `POST /task` — cria tarefa
  - body:
    ```json
    {
      "title": "string",
      "description": "string",
      "owner_id": "uuid"
    }
    ```

- `GET /task` — lista tarefas por usuário
  - body:
    ```json
    {
      "owner_id": "uuid"
    }
    ```

- `GET /task/:taskId` — busca tarefa por id
- `PATCH /task/:taskId` — atualiza título/descrição
- `DELETE /task/:taskId` — remove tarefa
- `PATCH /task/:taskId` — alterna campo `finished`

### Categorias (`/category`)

- `POST /category` — cria categoria
  - body:
    ```json
    {
      "name": "string",
      "user_id": "uuid"
    }
    ```

- `GET /category` — lista categorias por usuário
  - body:
    ```json
    {
      "user_id": "uuid"
    }
    ```

- `GET /category/:categoryId` — busca categoria por id
- `PATCH /category/:categoryId` — atualiza nome
- `DELETE /category/:categoryId` — remove categoria

## Observações técnicas

- O middleware de autenticação existe em `src/https/middlewares/authenticate.ts`.
- O projeto contém `swagger.ts`, porém a configuração de `endpointsFiles` aponta para um caminho inexistente (`./src/routes/index.ts`) e pode exigir ajuste antes de gerar documentação Swagger.
