// Opções de venda: "value" é o que vai para o banco (igual ao ENUM),
// "label" é o texto exibido na tela, com acentuação correta.

export const FORMAS_PAGAMENTO = [
    { value: "Pix", label: "Pix" },
    { value: "Dinheiro", label: "Dinheiro" },
    { value: "Credito", label: "Cartão de Crédito" },
    { value: "debito", label: "Cartão de Débito" },
];

export const STATUS_VENDA = [
    { value: "pendente", label: "Pendente" },
    { value: "Finalizado", label: "Finalizado" },
    { value: "Cancelado", label: "Cancelado" },
];

// Compara ignorando maiúsculas/minúsculas e acentos ("CRÉDITO" == "credito")
const normalizar = (texto) =>
    String(texto ?? "")
        .normalize("NFD")
        .replace(/[̀-ͯ]/g, "")
        .trim()
        .toLowerCase();

const encontrar = (opcoes, valor) =>
    opcoes.find((opcao) => normalizar(opcao.value) === normalizar(valor));

// Valor vindo da API -> valor da opção correspondente (para o <select>)
export const valorFormaPagamento = (valor) =>
    encontrar(FORMAS_PAGAMENTO, valor)?.value ?? valor;

export const valorStatus = (valor) =>
    encontrar(STATUS_VENDA, valor)?.value ?? valor;

// Valor vindo da API -> texto para exibir
export const labelFormaPagamento = (valor) =>
    encontrar(FORMAS_PAGAMENTO, valor)?.label ?? valor;

export const labelStatus = (valor) =>
    encontrar(STATUS_VENDA, valor)?.label ?? valor;
