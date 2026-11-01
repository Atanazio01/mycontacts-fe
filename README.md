# MyContacts Front-end

Interface web do MyContacts (curso JStack): listar, buscar, criar, editar e remover contatos com categorias.

## Stack

- React 19 (Create React App)
- React Router 7 (`useRoutes`)
- styled-components 6
- ESLint (Airbnb)

## Pré-requisitos

- Node.js 22+ e Yarn
- [MyContacts API](../mycontacts-api) rodando em `http://localhost:3001`

A URL da API está fixa em `src/services/ContactsService.js` e `src/services/CategoriesService.js`.

## Rodando

```bash
yarn
yarn start
```

App em `http://localhost:3000`. A API só libera CORS para as portas `3000` e `3002`.

## Scripts

| Script       | Descrição                        |
| ------------ | -------------------------------- |
| `yarn start` | Servidor de desenvolvimento      |
| `yarn build` | Build de produção em `build/`    |
| `yarn test`  | Testes em modo watch             |

## Rotas

| Rota        | Página                                  |
| ----------- | --------------------------------------- |
| `/`         | Lista de contatos (busca e ordenação)   |
| `/new`      | Novo contato                            |
| `/edit/:id` | Edição de contato                       |

## Estrutura

```
src/
├── Router.js         # rotas
├── pages/            # Home, NewContact, EditContact (lógica em hooks use*.js)
├── components/       # componentes reutilizáveis (Modal, Toast, ContactForm...)
├── services/         # HttpClient, services da API e mappers
├── hooks/            # hooks compartilhados (useErrors, useSafeAsyncState...)
├── lib/              # EventManager
├── errors/           # APIError
├── utils/            # formatPhone, isEmailValid, toast, delay
└── assets/           # estilos globais, tema e imagens
```
