# My Sales DNC

API REST para gerenciamento de vendas e usuários.

## 🚀 Tecnologias

- [Node.js](https://nodejs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Express](https://expressjs.com/)
- [TypeORM](https://typeorm.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [JWT](https://jwt.io/)
- [Bcrypt](https://github.com/dcodeIO/bcrypt.js)
- [Celebrate](https://github.com/arb/celebrate) (Validação de dados)

## 📋 Pré-requisitos

- Node.js (versão 14 ou superior)
- PostgreSQL
- npm ou yarn

## 🔧 Instalação

1. Clone o repositório:

```bash
git clone https://github.com/seu-usuario/my-sales-dnc.git
cd my-sales-dnc
```

2. Instale as dependências:

```bash
npm install
```

3. Configure as variáveis de ambiente:
   Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=seu_usuario
DB_PASS=sua_senha
DB_NAME=my_sales_dnc
JWT_SECRET=seu_segredo_jwt
```

4. Execute as migrações:

```bash
npm run typeorm migration:run
```

5. Inicie o servidor:

```bash
npm run dev
```

## 📦 Estrutura do Projeto

```
src/
├── modules/
│   ├── users/
│   │   ├── controllers/
│   │   ├── services/
│   │   ├── routes/
│   │   └── database/
│   └── sales/
│       ├── controllers/
│       ├── services/
│       ├── routes/
│       └── database/
├── shared/
│   ├── errors/
│   └── middlewares/
└── database/
    └── migrations/
```

## 🔌 Rotas da API

### Usuários

#### Criar usuário

- **POST** `/users`

```json
{
  "name": "João Silva",
  "email": "joao.silva@email.com",
  "password": "senha123456",
  "avatar": "https://exemplo.com/avatar.jpg" // opcional
}
```

#### Listar usuários

- **GET** `/users`

#### Buscar usuário por ID

- **GET** `/users/:id`

#### Atualizar usuário

- **PUT** `/users/:id`

```json
{
  "name": "João Silva Atualizado",
  "email": "joao.silva@email.com",
  "avatar": "https://exemplo.com/novo-avatar.jpg"
}
```

#### Deletar usuário

- **DELETE** `/users/:id`

### Vendas

#### Criar venda

- **POST** `/sales`

```json
{
  "product": "Produto XYZ",
  "quantity": 2,
  "price": 99.9,
  "customer": "Cliente ABC"
}
```

#### Listar vendas

- **GET** `/sales`

#### Buscar venda por ID

- **GET** `/sales/:id`

#### Atualizar venda

- **PUT** `/sales/:id`

```json
{
  "product": "Produto XYZ Atualizado",
  "quantity": 3,
  "price": 89.9,
  "customer": "Cliente ABC"
}
```

#### Deletar venda

- **DELETE** `/sales/:id`

## 🔐 Autenticação

A API utiliza JWT (JSON Web Token) para autenticação. Para acessar rotas protegidas, inclua o token no header da requisição:

```
Authorization: Bearer seu_token_jwt
```

## 🧪 Testes

Para executar os testes:

```bash
npm test
```

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
