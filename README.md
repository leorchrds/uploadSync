# UploadSync

UploadSync é um projeto que combina um backend baseado em NestJS e um frontend usando Next.js. O objetivo é fornecer uma aplicação que permite o upload e gerenciamento de dados em tempo real.

## Estrutura do Projeto

O projeto está dividido em duas pastas principais:

- **`backend`**: Contém o código do backend, desenvolvido com NestJS.
- **`frontend`**: Contém o código do frontend, desenvolvido com Next.js.

## Pré-requisitos

Certifique-se de ter as seguintes ferramentas instaladas:

- [Node.js](https://nodejs.org/) (versão LTS recomendada)
- [npm](https://www.npmjs.com/) ou [Yarn](https://classic.yarnpkg.com/)

## Instalação

### Configuração do Backend

1. Navegue para o diretório `backend`:

    ```bash
    cd backend
    ```

2. Instale as dependências:

    ```bash
    npm install
    ```

3. Inicie o servidor de desenvolvimento:

    ```bash
    npm run start:dev
    ```

### Configuração do Frontend

1. Navegue para o diretório `frontend`:

    ```bash
    cd frontend
    ```

2. Instale as dependências:

    ```bash
    npm install
    ```

3. Inicie o servidor de desenvolvimento:

    ```bash
    npm run dev
    ```

## Login

Para acessar a aplicação, siga as etapas abaixo:

1. Navegue até a página de login através da seguinte URL:

    ```bash
    http://localhost:3001/auth/login
    ```

2. Insira as credenciais de login:

    - **E-mail**: `user@example.com`
    - **Senha**: `password123`

3. Após o login bem-sucedido, um token JWT será gerado e utilizado para acessar as rotas protegidas da aplicação.

4. Para deslogar, navegue até:

    ```bash
    http://localhost:3001/auth/logout
    ```

## Tecnologias Usadas

### Frontend

- **[Next.js](https://nextjs.org/)**: Framework React para criação de aplicações web rápidas e escaláveis.
- **[React](https://reactjs.org/)**: Biblioteca JavaScript para construir interfaces de usuário.
- **[Tailwind CSS](https://tailwindcss.com/)**: Framework de CSS utilitário para criar designs modernos e responsivos.
- **[Framer Motion](https://www.framer.com/api/motion/)**: Biblioteca para animações em React.
- **[Shadcn/UI](https://github.com/shadcn/ui)**: Conjunto de componentes de UI para React.

### Backend

- **[NestJS](https://nestjs.com/)**: Framework para construção de aplicações server-side eficientes e escaláveis.
- **[TypeORM](https://typeorm.io/)**: ORM para TypeScript e JavaScript.
- **[PostgreSQL](https://www.postgresql.org/)**: Sistema de gerenciamento de banco de dados relacional.
- **[Passport](http://www.passportjs.org/)**: Middleware para autenticação em Node.js.
- **[JWT](https://jwt.io/)**: Padrão de token para autenticação.

### Outras Ferramentas

- **[Axios](https://axios-http.com/)**: Cliente HTTP baseado em Promises para o navegador e Node.js.
- **[Prettier](https://prettier.io/)**: Formatter de código.
- **[ESLint](https://eslint.org/)**: Ferramenta para identificar e relatar padrões problemáticos no código JavaScript.
