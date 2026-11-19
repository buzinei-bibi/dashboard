<p align="center">
  <img src="src/assets/logo.png" alt="logo he4rt developers" width="120" />
</p>

<h1 align="center">DASHBOARD</h1>

<p align="center">
  exercício de sala de aula para entender melhor como funciona um dashboard em react.js, consumindo uma api em php. a identidade visual é inspirada na comunidade he4rt developers.
</p>

## FUNCIONALIDADES
- **login** com regras de senha forte e opção "lembrar-me"; sem login, o painel volta para a tela de entrada
- **página inicial** com um terminal animado que mostra o resumo da loja (clientes, fornecedores, produtos, vendas e compras) e atalhos para nova venda e nova compra
- **clientes, fornecedores e produtos:** lista, cadastro, edição e exclusão (crud completo pela api)
- **produtos** com marca (vinda da api de marcas), foto e preço com máscara de dinheiro; produto sem foto não mostra nada no lugar
- **vendas e compras:** formulário com cliente/fornecedor, produtos, quantidades, forma de pagamento, status e total
- **busca na api** enquanto digita (espera 500ms depois que você para de digitar)
- **máscaras** de cpf, cnpj, telefone/whatsapp, cep e dinheiro
- **exclusão** com janela de confirmação
- **notificações** (toasts) de sucesso e erro
- **carregando** enquanto busca, salva ou exclui
- **tema claro e escuro**, os dois em gradiente roxo, lembrando a escolha do usuário
- **foto de perfil** com vários personagens para escolher; a escolha fica salva no navegador
- **celular:** menu lateral abre pelo botão ☰ e cada linha das tabelas vira um cartão

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
o front usa a api do repositório `banco-de-dados` e espera as rotas `/clientes/`, `/fornecedores/`, `/produtos/`, `/marcas/`, `/vendas/` e `/compras/`, cada uma com:

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
├── assets/              logo e foto de perfil padrão
│   └── avatars/         fotos de perfil para escolher (toda imagem aqui vira opção)
├── components/
│   ├── loading.jsx      tela de carregando
│   ├── layout/          card, header (tema e usuário), sidebar e table
│   └── ui/              button, image-upload, input, label, modal, search-input, select e textarea
├── pages/
│   ├── login/           tela de login e regras de senha
│   ├── home/            página inicial com o terminal e o coração de fundo
│   ├── mainlayout.jsx   sidebar + header; manda para o login quem não entrou
│   ├── clientes/        clients-list e clients-form
│   ├── fornecedores/    suppliers-list e suppliers-form
│   ├── produtos/        products-list e products-form
│   ├── vendas/          vendas-list e vendas-form
│   └── compras/         compras-list e compras-form
├── services/            api.js, auth-service + clientes, fornecedores, marcas, produtos, vendas e compras
├── app.jsx              rotas
├── app.css              importa o tailwind
└── index.css            cores e gradientes dos temas
```

## O QUE APRENDI
- como funcionam componentes em react
- como organizar um dashboard em páginas e componentes reutilizáveis
- como navegar entre telas
- como montar tema claro e escuro com tailwind
- como consumir uma api (get, post, put e delete) com fetch
- como proteger rotas com login
- como adaptar o layout para celular

## PRÓXIMOS PASSOS
- login conferindo e-mail e senha na api (hoje as regras de senha são checadas só no navegador)
- foto de perfil própria para cada cliente
- paginação nas listas

## PADRÕES DO PROJETO
- nomes de arquivos e pastas sempre em minúsculo, com hífen separando as palavras (ex: `clients-list.jsx`)
- todos os textos que aparecem na tela escritos em MAIÚSCULO no código
