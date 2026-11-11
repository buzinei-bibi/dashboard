<p align="center">
  <img src="src/assets/logo.png" alt="logo he4rt developers" width="120" />
</p>

<h1 align="center">DASHBOARD</h1>

<p align="center">
  exercício de sala de aula para entender melhor como funciona um dashboard em react.js, consumindo uma api em php. a identidade visual é inspirada na comunidade he4rt developers.
</p>

## FUNCIONALIDADES
- **clientes, fornecedores e produtos:** lista, cadastro, edição e exclusão (crud completo pela api)
- **produtos** com marca (vinda da api de marcas), foto e preço com máscara de dinheiro
- **vendas:** formulário de venda com cliente, produtos, quantidades e total
- **busca na api** enquanto digita (espera 500ms depois que você para de digitar)
- **máscaras** de cpf, cnpj, telefone/whatsapp, cep e dinheiro
- **exclusão** com janela de confirmação
- **notificações** (toasts) de sucesso e erro
- **carregando** enquanto busca, salva ou exclui
- **tema claro e escuro**, os dois em gradiente roxo, lembrando a escolha do usuário
- menu lateral que vira só ícones em telas pequenas

## TECNOLOGIAS
- [react 19](https://react.dev) + [vite](https://vite.dev)
- [tailwind css](https://tailwindcss.com)
- [react router](https://reactrouter.com) para navegar entre as telas
- [react icons](https://react-icons.github.io/react-icons)
- [react toastify](https://fkhadra.github.io/react-toastify) para as notificações

## COMO RODAR
precisa ter o [node.js](https://nodejs.org) instalado e a api php rodando (por padrão em `http://localhost:8080`).

crie um arquivo `.env` na raiz com o endereço da api:

```
VITE_API_URL=http://localhost:8080
VITE_API_TOKEN=
```

depois:

```bash
npm install
npm run dev
```

e é só abrir o endereço que aparecer no terminal (normalmente `http://localhost:5173`).

outros comandos:
- `npm run build` gera a versão final na pasta `dist`
- `npm run lint` procura erros no código

## API
o front espera as rotas `/clientes/`, `/fornecedores/`, `/produtos/`, `/marcas/` e `/vendas/`, cada uma com:

| ação | método | rota |
|---|---|---|
| listar | GET | `/clientes/` |
| buscar por id | GET | `/clientes/?id=1` |
| pesquisar | GET | `/clientes/?search=texto` |
| criar | POST | `/clientes/` |
| atualizar | PUT | `/clientes/?id=1` |
| excluir | DELETE | `/clientes/?id=1` |

as respostas vêm no formato `{ "data": [...], "message": "..." }`; `204` significa nenhum registro.

## ESTRUTURA
```
src/
├── assets/              logo e foto de perfil
├── components/
│   ├── loading.jsx      tela de carregando
│   ├── layout/          card, header (tema e usuário), sidebar e table
│   └── ui/              button, image-upload, input, label, modal, search-input, select e textarea
├── pages/
│   ├── clientes/        clients-list e clients-form
│   ├── fornecedores/    suppliers-list e suppliers-form
│   ├── produtos/        products-list e products-form
│   └── vendas/          vendas-form
├── services/            api.js + clientes, fornecedores, marcas, produtos e vendas
├── app.jsx              rotas e layout geral
├── app.css              importa o tailwind
└── index.css            cores e gradientes dos temas
```

## O QUE APRENDI
- como funcionam componentes em react
- como organizar um dashboard em páginas e componentes reutilizáveis
- como navegar entre telas
- como montar tema claro e escuro com tailwind
- como consumir uma api (get, post, put e delete) com fetch

## PRÓXIMOS PASSOS
- foto de perfil própria para cada cliente
- paginação nas listas
- login para acessar o painel

## PADRÕES DO PROJETO
- nomes de arquivos e pastas sempre em minúsculo, com hífen separando as palavras (ex: `clients-list.jsx`)
- todos os textos que aparecem na tela escritos em MAIÚSCULO no código
