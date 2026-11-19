import { useState } from "react";
import {
  BsEnvelope,
  BsLock,
  BsEye,
  BsEyeSlash,
  BsBoxArrowInRight,
  BsCheckCircleFill,
  BsXCircle,
} from "react-icons/bs";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { entrar, estaLogado } from "../../services/auth-service";
import { verificarSenha } from "./senha-regras";
import logo from "../../assets/logo.png";

// Barra de força: quantas regras a senha já cumpre
const forcaDaSenha = (cumpridas, total) => {
  if (cumpridas === total) return { texto: "forte", cor: "bg-emerald-500", largura: "w-full" };
  if (cumpridas >= total - 2) return { texto: "média", cor: "bg-amber-400", largura: "w-2/3" };
  return { texto: "fraca", cor: "bg-rose-500", largura: "w-1/3" };
};

const campoClasse = `
  normal-case placeholder:normal-case
  block w-full rounded-xl border border-purple-200 bg-field
  py-3 pl-11 text-sm text-slate-800 placeholder:text-slate-400
  focus:outline-none focus:border-purple-400 focus:ring-4 focus:ring-purple-400/20
  dark:border-white/10 dark:text-slate-100 dark:placeholder:text-purple-200/30
  dark:[color-scheme:dark]
`;

const iconeClasse =
  "absolute left-4 top-1/2 -translate-y-1/2 text-purple-400 dark:text-purple-200/50";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // Página que a pessoa tentou abrir antes de ser mandada para o login
  const destino = location.state?.from?.pathname || "/";

  const [credentials, setCredentials] = useState({
    email: "",
    senha: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [lembrar, setLembrar] = useState(false);
  const [tentouEntrar, setTentouEntrar] = useState(false);

  const regras = verificarSenha(credentials.senha, credentials.email.trim());
  const cumpridas = regras.filter((regra) => regra.ok).length;
  const senhaOk = cumpridas === regras.length;
  const forca = forcaDaSenha(cumpridas, regras.length);
  // A lista aparece assim que começa a digitar a senha (ou ao tentar entrar)
  const mostrarRegras = credentials.senha.length > 0 || tentouEntrar;

  const handleChange = (e) => {
    setCredentials((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTentouEntrar(true);

    if (!credentials.email.trim() || !credentials.senha) {
      toast.error("Preencha o e-mail e a senha.");
      return;
    }

    if (!senhaOk) {
      toast.error("A senha não atende aos requisitos de segurança.");
      return;
    }

    entrar(credentials.email.trim(), lembrar);
    navigate(destino, { replace: true });
  };

  // Já logado: não precisa ver o login de novo
  if (estaLogado()) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-app px-4 text-slate-800 dark:text-slate-100 uppercase">
      {/* brilhos de fundo, como na sidebar */}
      <div className="pointer-events-none absolute -top-24 -right-24 h-96 w-96 rounded-full bg-fuchsia-400/25 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-violet-400/25 blur-3xl" />

      {/* card login */}
      <div className="relative z-10 w-full max-w-md rounded-3xl border border-purple-200/70 dark:border-white/10 bg-surface p-6 sm:p-8 backdrop-blur-xl shadow-[0_20px_50px_-24px_rgba(91,33,182,0.35)] dark:shadow-[0_20px_50px_-24px_rgba(0,0,0,0.8)]">
        {/* header */}
        <div className="mb-8 flex flex-col items-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-brand shadow-glow">
            <img
              src={logo}
              alt="He4rt Developers"
              className="h-10 w-auto drop-shadow-[0_4px_12px_rgba(255,255,255,0.35)]"
            />
          </div>

          <h1 className="mt-5 text-3xl font-bold text-gradient">
            bem-vindo
          </h1>

          <p className="mt-2 text-sm text-slate-500 dark:text-purple-200/60">
            faça login para acessar o sistema
          </p>
        </div>

        {/* form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* e-mail */}
          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-medium">
              e-mail
            </label>

            <div className="relative">
              <BsEnvelope size={18} className={iconeClasse} />
              <input
                id="email"
                type="email"
                name="email"
                value={credentials.email}
                onChange={handleChange}
                placeholder="seuemail@empresa.com"
                autoComplete="email"
                className={`${campoClasse} pr-4`}
              />
            </div>
          </div>

          {/* Senha */}
          <div>
            <label htmlFor="senha" className="mb-2 block text-sm font-medium">
              Senha
            </label>

            <div className="relative">
              <BsLock size={18} className={iconeClasse} />
              <input
                id="senha"
                type={showPassword ? "text" : "password"}
                name="senha"
                value={credentials.senha}
                onChange={handleChange}
                placeholder="••••••••"
                autoComplete="current-password"
                aria-describedby="senha-regras"
                aria-invalid={tentouEntrar && !senhaOk}
                className={`${campoClasse} pr-12`}
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "esconder senha" : "mostrar senha"}
                className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-purple-400 hover:text-purple-600 dark:text-purple-200/50 dark:hover:text-purple-100"
              >
                {showPassword ? <BsEyeSlash size={18} /> : <BsEye size={18} />}
              </button>
            </div>

            {/* força da senha e requisitos */}
            <div id="senha-regras" className={mostrarRegras ? "mt-3" : "sr-only"}>
              <div className="flex items-center gap-3">
                <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-purple-100 dark:bg-white/10">
                  <div className={`h-full rounded-full transition-all duration-300 ${forca.cor} ${forca.largura}`} />
                </div>
                <span className="text-[11px] font-semibold tracking-wider text-slate-500 dark:text-purple-200/60">
                  senha {forca.texto}
                </span>
              </div>

              <p className="mt-3 text-[11px] tracking-wider text-slate-500 dark:text-purple-200/60">
                a senha precisa ter:
              </p>
              <ul className="mt-1.5 grid grid-cols-1 gap-1 text-xs sm:grid-cols-2">
                {regras.map((regra) => (
                  <li
                    key={regra.id}
                    className={`flex items-start gap-1.5 ${
                      regra.ok
                        ? "text-emerald-600 dark:text-emerald-400"
                        : tentouEntrar
                          ? "text-rose-600 dark:text-rose-400"
                          : "text-slate-500 dark:text-purple-200/60"
                    }`}
                  >
                    {regra.ok ? (
                      <BsCheckCircleFill size={13} className="mt-0.5 shrink-0" aria-hidden="true" />
                    ) : (
                      <BsXCircle size={13} className="mt-0.5 shrink-0" aria-hidden="true" />
                    )}
                    <span>
                      <span className="sr-only">{regra.ok ? "cumprido: " : "falta: "}</span>
                      {regra.texto}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* opções */}
          <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
            <label className="flex cursor-pointer items-center gap-2 text-slate-600 dark:text-purple-200/70">
              <input
                type="checkbox"
                checked={lembrar}
                onChange={(e) => setLembrar(e.target.checked)}
                className="h-4 w-4 rounded accent-purple-600"
              />
              lembrar-me
            </label>

            <button
              type="button"
              className="cursor-pointer font-medium text-purple-600 hover:text-purple-800 dark:text-purple-300 dark:hover:text-purple-100"
            >
              esqueci minha senha
            </button>
          </div>

          {/* botão login */}
          <button
            type="submit"
            className="btn-primary flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-xl"
          >
            <BsBoxArrowInRight size={18} />
            Entrar
          </button>
        </form>

        {/* rodapé */}
        <div className="mt-8 border-t border-purple-100 dark:border-white/10 pt-5 text-center">
          <p className="text-xs text-slate-500 dark:text-purple-200/50">
            © {new Date().getFullYear()} he4rt developers
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
