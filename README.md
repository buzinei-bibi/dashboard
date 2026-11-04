<p align="center">
  <img src=".github/logo.png" alt="logo he4rt developers" width="120" />
</p>

<h1 align="center">dashboard</h1>

<p align="center">
  exercício de sala de aula para entender melhor como funciona um dashboard em react.js, com a ideia de implementar a parte do back-end depois. a identidade visual é inspirada na comunidade he4rt developers.
</p>

## funcionalidades
- **dashboard:** quantidade de clientes, cidades atendidas e os últimos cadastrados
- **clientes:** lista com busca por nome, e-mail ou cidade
- **cadastro e edição:** formulário completo (dados pessoais e endereço)
- **exclusão** com confirmação
- **tema claro e escuro**, os dois em gradiente roxo, lembrando a escolha do usuário
- menu lateral que vira só ícones em telas pequenas

## tecnologias
- [react 19](https://react.dev) + [vite](https://vite.dev)
- [tailwind css 4](https://tailwindcss.com)
- [react router](https://reactrouter.com) para navegar entre as telas
- [react icons](https://react-icons.github.io/react-icons)

## como rodar
precisa ter o [node.js](https://nodejs.org) instalado.

```bash
npm install
npm run dev
```

depois é só abrir o endereço que aparecer no terminal (normalmente `http://localhost:5173`).

outros comandos:
- `npm run build` gera a versão final na pasta `dist`
- `npm run lint` procura erros no código

## estrutura
```
src/
├── assets/              logo e foto de perfil
├── components/
│   ├── layout/          cabeçalho, menu lateral e rodapé
│   └── ui/              peças reutilizáveis: card, tabela, campo, avatar
├── pages/
│   ├── Home/            tela inicial (dashboard)
│   └── Clientes/        lista e formulário de clientes
├── services/
│   └── clientes.js      lê e salva os clientes (por enquanto no navegador)
├── App.jsx              rotas e layout geral
└── index.css            cores e gradientes dos temas
```

os dados ficam salvos no `localStorage` do navegador, no lugar de um back-end real. quando o back-end existir, é só trocar as funções de `src/services/clientes.js` por chamadas à api.

## o que aprendi
- como funcionam componentes em react
- como organizar um dashboard em páginas e componentes reutilizáveis
- como navegar entre telas
- como montar tema claro e escuro com tailwind
- como o front-end vai precisar de um back-end para fornecer os dados de verdade

## próximos passos
- criar o back-end para alimentar a tela de clientes
- trocar os dados de exemplo por dados reais
- foto de perfil própria para cada cliente
