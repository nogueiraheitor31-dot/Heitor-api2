# API REST com Node.js, Express e MySQL — Arquitetura MVC

- **Aluno:** Heitor Nogueira
- **Turma:** 3NDN
- **Disciplina:** Programação Web III (PW3) — Atividade Prática 02

## Arquitetura em camadas (MVC)
A API foi refatorada para separar responsabilidades:

| Pasta | Responsabilidade |
|-------|------------------|
| `src/config/` | Conexão com o MySQL (pool) e leitura do `.env` |
| `src/models/` | **Model**: único lugar com SQL, sempre com queries parametrizadas (`?`) |
| `src/controllers/` | **Controller**: recebe `req`, valida os dados, chama o Model e envia `res` com o status HTTP adequado |
| `src/routes/` | Define os endpoints com `express.Router()` e liga cada verbo ao Controller |
| `src/server.js` | Configura middlewares (`cors`, `express.json`), registra as rotas e sobe o servidor |

Como a aplicação é uma API, a **View** é a resposta em JSON retornada pelo Express.

Fluxo: `Rota → Controller → Model → MySQL`, e a resposta volta pelo caminho inverso.

## Pré-requisitos
- Node.js 18+
- MySQL em execução

## Como rodar
1. Clone o repositório e entre na pasta:
   ```bash
   git clone https://github.com/SEU-USUARIO/nome-do-aluno-API-node-mvc.git
   cd nome-do-aluno-API-node-mvc
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Crie o banco e a tabela:
   ```bash
   mysql -u root -p < schema.sql
   ```
4. Copie `.env.example` para `.env` e preencha (use `DB_NAME=api_usuarios`):
   ```bash
   cp .env.example .env
   ```
5. Inicie o servidor:
   ```bash
   npm start        # produção
   npm run dev      # desenvolvimento, com nodemon
   ```

## Endpoints
| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/usuarios` | Lista todos os usuários |
| POST | `/usuarios` | Cria usuário (`{ "nome": "...", "email": "..." }`) |
| PUT | `/usuarios/:id` | Atualiza nome e email |
| DELETE | `/usuarios/:id` | Remove o usuário |

Códigos HTTP usados: 200, 201, 400, 404 e 500.
