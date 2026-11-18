export const SENHA_MIN = 8;
export const SENHA_MAX = 64;

// senhas mais usadas e vazadas (inclui as que "passam" nas regras, como Senha@123)
const SENHAS_COMUNS = [
    "12345678", "123456789", "1234567890", "87654321", "11111111", "00000000",
    "password", "password1", "password123", "password@123", "password1!",
    "senha123", "senha1234", "senha@123", "senha#123", "senha!123", "senha@1234",
    "mudar123", "mudar@123", "mudar@1234", "trocar@123",
    "admin123", "admin@123", "admin@1234", "administrador", "admin!123",
    "qwerty123", "qwerty@123", "abc12345", "abc@1234", "abcd@1234",
    "iloveyou", "teamo123", "brasil123", "brasil@123", "welcome1", "welcome@123",
    "p@ssw0rd", "p@ssword", "pa$$w0rd", "passw0rd", "dashboard@123", "he4rt@123",
];

const ehComum = (senha) => SENHAS_COMUNS.includes(senha.toLowerCase());

const usaEmail = (senha, email) => {
    const usuario = email.split("@")[0]?.toLowerCase() ?? "";
    return usuario.length >= 3 && senha.toLowerCase().includes(usuario);
};

export function verificarSenha(senha = "", email = "") {
    return [
        {
            id: "tamanho",
            texto: `de ${SENHA_MIN} a ${SENHA_MAX} caracteres`,
            ok: senha.length >= SENHA_MIN && senha.length <= SENHA_MAX,
        },
        { id: "maiuscula", texto: "uma letra maiúscula", ok: /\p{Lu}/u.test(senha) },
        { id: "minuscula", texto: "uma letra minúscula", ok: /\p{Ll}/u.test(senha) },
        { id: "numero", texto: "um número", ok: /\d/.test(senha) },
        {
            id: "simbolo",
            texto: "um símbolo (ex: ! @ # $ %)",
            ok: /[^\p{L}\p{N}\s]/u.test(senha),
        },
        {
            id: "comum",
            texto: "não ser uma senha comum (ex: senha@123)",
            ok: senha.length > 0 && !ehComum(senha),
        },
        {
            id: "email",
            texto: "não conter seu e-mail",
            ok: senha.length > 0 && !usaEmail(senha, email),
        },
    ];
}

export const senhaValida = (senha, email) =>
    verificarSenha(senha, email).every((regra) => regra.ok);
