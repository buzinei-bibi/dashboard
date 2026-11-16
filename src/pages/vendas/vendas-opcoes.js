export const FORMAS_PAGAMENTO = [
    { value: "pix", label: "pix" },
    { value: "dinheiro", label: "dinheiro" },
    { value: "crédito", label: "cartão de crédito" },
    { value: "débito", label: "cartão de débito" },
];

export const STATUS_VENDA = [
    { value: "pendente", label: "pendente"},
    { value: "finalizado", label: "finalizado" },
    { value: "cancelado", label: "cancelado" },
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
