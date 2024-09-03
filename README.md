# Teste-tecnico
Desafio: Criar uma Aplicação de Gerenciamento de Tarefas que permita aos usuários gerenciar suas tarefas. A aplicação deve ter funcionalidades de criação, leitura, atualização e exclusão (CRUD) de tarefas. 

## :four_leaf_clover: Technologies used

Este projeto foi desenvolvido com as seguintes tecnologias:

### Frontend:
-   [TypeScript](https://www.typescriptlang.org/docs/)
-   [ReactJS](https://reactjs.org/)
-   [React-Router-Dom](https://reactrouter.com/en/main)
-   [Tailwindcss](https://tailwindcss.com/)

### Backend:
-   [NodeJs](https://nodejs.org/en)
-   [Express](https://expressjs.com/pt-br/)
-   [Json Web Token](https://jwt.io/)
-   [Cors](https://www.npmjs.com/package/cors?activeTab=readme)
-   [Bcrypt](https://www.npmjs.com/package/bcrypt)
-   [Knex](https://knexjs.org/)
-   [Zod](https://zod.dev/)
-   [Helmet](https://www.npmjs.com/package/helmet)
-   [Dotenv](https://www.npmjs.com/package/dotenv)
-   [MySQL](https://www.mysql.com/)
-   [VS Code](https://code.visualstudio.com/)

## Requisitos Funcionais
### Cadastro de Usuário:
- [x] O usuário deve ser capaz de se cadastrar com e-mail e senha. 
- [x] Implementar validação básica para e-mail e senha.

### Autenticação:
- [x] Implementar login e logout de usuários utilizando JWT (JSON Web Token). 
- [x] Apenas usuários autenticados devem ter acesso às funcionalidades de gerenciamento de tarefas.

### Gerenciamento de Tarefas: 
- [x] Listar todas as tarefas do usuário autenticado. 
- [x] Adicionar novas tarefas com um título e uma descrição. 
- [x] Marcar tarefas como concluídas. 
- [x] Editar o título e a descrição de uma tarefa. 
- [x] Excluir uma tarefa.

### Interface de Usuário: 
- [x] A interface deve ser intuitiva e responsiva. 
- [x] Implementar a interface utilizando React. 
- [x] Utilizar hooks do React para gerenciar estado e efeitos colaterais.

## Requisitos Técnicos:
### Backend com Node.js
- [x] Utilizar Express.js ou NestJS para criar uma API RESTful. 
- [x] Conectar o backend a um banco de dados (Mysql ou SQLite). 
- [x] Implementar autenticação e autorização utilizando JWT.

### Frontend com React:
- [x] O frontend deve consumir a API criada no backend. 
- [x] Implementar gerenciamento de estado utilizando React (ou Context API). 
- [x] Implementar rotas com React Router (opcional, mas recomendado).

#### Testes(Opcional): 
- [x] Implementar testes básicos para o backend (unitários e/ou de integração) 
- [] Implementar testes básicos para o frontend (unitários e/ou de integração) 

### Deploy: (Opcional): 
- [] Fazer o deploy da aplicação em uma plataforma de sua escolha (Heroku, Vercel, etc.).


## :rocket: Como executar o Codígo:

Para clonar e executar o aplicativo, você precisa ter [Git](https://git-scm.com), [Node.js](https://nodejs.org/en) e [MySql](https://www.mysql.com/) instalados em sua máquina.

```bash
# Clone da aplicação.
$ git clone https://github.com/Filipe-Santos17/Teste-tecnico

# Abra a pasta.
$ cd Teste-tecnico

# Instale as dependencias.
$ cd frontend ; npm install
$ cd ..
$ cd server ; npm install
```

Antes de executar o servidor, crie um arquivo env com o contéudo do arquivo .env.example, copie e cole o contéudo e escreva as respectivas respostas(ps: para facilitar deixei anotado algumas).

Forneça o usuário (normalmente root) e  senha do seu servidor mysql local para que haja acesso ao banco de dados.

``` bash
# Execute o server 
$ cd server ; npm run dev
```

``` bash
# Execute o front (em outro terminal) 
$ cd frontend ; npm run dev
```

Caso possua a extensão [Rest Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) você poderá executar o servidor utilizando o arquivo requests-tests.http

Nota: A validação em 2 etapas não pode ser feita sem a conexão a um email, por isso não execute o CreateUserWithTwoFactory ou LoginWithTwoFactory

Caso deseje executar os testes, copie o arquivo .env.example e crie um arquivo .env.test, garanta ter alterado o banco de dados para um banco de testes para evitar perda de dados