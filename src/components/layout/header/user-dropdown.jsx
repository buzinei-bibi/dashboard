import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { useNavigate } from 'react-router-dom'
import { BsBoxArrowRight } from 'react-icons/bs'
import perfil from '../../../assets/perfil.png'
import { sair, usuarioAtual } from '../../../services/auth-service'

// todas as imagens da pasta assets/avatars viram opção de foto de perfil
// (para adicionar um personagem novo, é só colocar a imagem nessa pasta)
const imagensAvatars = import.meta.glob('../../../assets/avatars/*.{png,jpg,jpeg,webp,gif,svg}', {
  eager: true,
  import: 'default',
})

const AVATARES = [
  { nome: 'perfil', src: perfil },
  ...Object.entries(imagensAvatars).map(([caminho, src]) => ({
    nome: caminho.split('/').pop(),
    src,
  })),
]

const CHAVE_AVATAR = 'avatar-escolhido'

// lê a foto salva no navegador (se não tiver ou der erro, usa a padrão)
const avatarSalvo = () => {
  try {
    return localStorage.getItem(CHAVE_AVATAR) || 'perfil'
  } catch {
    return 'perfil'
  }
}

const UserDropdown = () => {
  const navigate = useNavigate()
  const [aberto, setAberto] = useState(false)
  const [avatar, setAvatar] = useState(avatarSalvo)

  const email = usuarioAtual()?.email
  const fotoAtual = (AVATARES.find((a) => a.nome === avatar) || AVATARES[0]).src

  const escolherAvatar = (nome) => {
    setAvatar(nome)
    try {
      localStorage.setItem(CHAVE_AVATAR, nome)
    } catch {
      // sem localStorage a escolha vale só até recarregar a página
    }
  }

  // Fecha o menu ao apertar Esc (clicar fora fecha pela camada escura do fundo)
  useEffect(() => {
    if (!aberto) return

    const apertouEsc = (e) => {
      if (e.key === 'Escape') setAberto(false)
    }

    document.addEventListener('keydown', apertouEsc)
    return () => document.removeEventListener('keydown', apertouEsc)
  }, [aberto])

  const handleSair = () => {
    sair()
    navigate('/login', { replace: true })
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setAberto(!aberto)}
        aria-haspopup="menu"
        aria-expanded={aberto}
        className="block h-11 w-11 rounded-full p-0.5 bg-accent shadow-glow hover:cursor-pointer hover:brightness-110">
        <img src={fotoAtual} alt="foto de perfil" className="h-full w-full rounded-full object-cover bg-white" />
      </button>

      {/* o menu vai direto para o <body>: o header tem desfoque e prenderia o "fixed" dentro dele */}
      {aberto && createPortal(
        <>
          {/* camada que esconde o painel atrás do menu; clicar nela fecha o menu */}
          <div
            onClick={() => setAberto(false)}
            aria-hidden="true"
            className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-md"
          />
        <div
          role="menu"
          className="fixed top-[4.5rem] md:top-[5.5rem] right-4 sm:right-6 md:right-8 z-[70] w-64 max-w-[calc(100vw-2rem)] overflow-hidden rounded-2xl border border-purple-200/70 dark:border-white/10 bg-white dark:bg-[#1a1028] shadow-[0_20px_50px_-24px_rgba(91,33,182,0.45)] dark:shadow-[0_20px_50px_-24px_rgba(0,0,0,0.8)]"
        >
          {email && (
            <div className="px-4 py-3 border-b border-purple-100 dark:border-white/10">
              <span className="block text-[11px] tracking-[0.15em] text-slate-500 dark:text-purple-200/60">Conectado como</span>
              <span className="block truncate text-sm font-medium normal-case">{email}</span>
            </div>
          )}

          {AVATARES.length > 1 && (
            <div className="px-4 py-3 border-b border-purple-100 dark:border-white/10">
              <span className="block mb-2 text-[11px] tracking-[0.15em] text-slate-500 dark:text-purple-200/60">Escolher foto</span>
              <div className="grid grid-cols-4 gap-2">
                {AVATARES.map((a) => (
                  <button
                    key={a.nome}
                    type="button"
                    onClick={() => escolherAvatar(a.nome)}
                    aria-label={`usar foto ${a.nome}`}
                    aria-pressed={a.src === fotoAtual}
                    className={`aspect-square rounded-full p-0.5 hover:cursor-pointer hover:brightness-110 ${a.src === fotoAtual ? 'bg-accent shadow-glow' : 'bg-purple-200/50 dark:bg-white/10'}`}
                  >
                    <img src={a.src} alt="" className="h-full w-full rounded-full object-cover bg-white" />
                  </button>
                ))}
              </div>
            </div>
          )}

          <button
            type="button"
            role="menuitem"
            onClick={handleSair}
            className="flex w-full items-center gap-2 px-4 py-3 text-sm font-semibold text-purple-700 dark:text-purple-200 hover:cursor-pointer hover:bg-purple-500/10"
          >
            <BsBoxArrowRight size={16} />
            Sair
          </button>
        </div>
        </>,
        document.body
      )}
    </div>
  )
}

export default UserDropdown
