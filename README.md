# Teste-tecnico
Desafio: Criar uma Aplicação de Gerenciamento de Tarefas que permita aos usuários gerenciar suas tarefas. A aplicação deve ter funcionalidades de criação, leitura, atualização e exclusão (CRUD) de tarefas. 

## Requisitos Funcionais
### Cadastro de Usuário:
- [x] O usuário deve ser capaz de se cadastrar com e-mail e senha. 
- [x] Implementar validação básica para e-mail e senha.

### Autenticação:
- [] Implementar login e logout de usuários utilizando JWT (JSON Web Token). 
- [x] Apenas usuários autenticados devem ter acesso às funcionalidades de gerenciamento de tarefas.

### Gerenciamento de Tarefas: 
- [x] Listar todas as tarefas do usuário autenticado. 
- [x] Adicionar novas tarefas com um título e uma descrição. 
- [x] Marcar tarefas como concluídas. 
- [x] Editar o título e a descrição de uma tarefa. 
- [x] Excluir uma tarefa.

### Interface de Usuário: 
- [] A interface deve ser intuitiva e responsiva. 
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