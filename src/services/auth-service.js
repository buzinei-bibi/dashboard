
const CHAVE = "usuario";

export function entrar(email, lembrar = false) {
    const dados = JSON.stringify({ email });
    sair();
    (lembrar ? localStorage : sessionStorage).setItem(CHAVE, dados);
}

export function sair() {
    localStorage.removeItem(CHAVE);
    sessionStorage.removeItem(CHAVE);
}

export function usuarioAtual() {
    const dados = localStorage.getItem(CHAVE) || sessionStorage.getItem(CHAVE);
    try {
        return dados ? JSON.parse(dados) : null;
    } catch {
        return null;
    }
}

export function estaLogado() {
    return Boolean(localStorage.getItem(CHAVE) || sessionStorage.getItem(CHAVE));
}
