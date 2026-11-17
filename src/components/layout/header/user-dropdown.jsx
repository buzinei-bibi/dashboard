import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BsBoxArrowRight } from 'react-icons/bs'
import perfil from '../../../assets/perfil.png'
import { sair, usuarioAtual } from '../../../services/auth-service'

const UserDropdown = () => {
  const navigate = useNavigate()
  const [aberto, setAberto] = useState(false)
  const menuRef = useRef(null)
  const email = usuarioAtual()?.email

  // Fecha o menu ao clicar fora ou apertar Esc
  useEffect(() => {
    if (!aberto) return

    const clicouFora = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setAberto(false)
    }
    const apertouEsc = (e) => {
      if (e.key === 'Escape') setAberto(false)
    }

    document.addEventListener('mousedown', clicouFora)
    document.addEventListener('keydown', apertouEsc)
    return () => {
      document.removeEventListener('mousedown', clicouFora)
      document.removeEventListener('keydown', apertouEsc)
    }
  }, [aberto])

  const handleSair = () => {
    sair()
    navigate('/login', { replace: true })
  }

  return (
    <div ref={menuRef} className="relative">
      <button
        type="button"
        onClick={() => setAberto(!aberto)}
        aria-haspopup="menu"
        aria-expanded={aberto}
        className="block h-11 w-11 rounded-full p-0.5 bg-accent shadow-glow hover:cursor-pointer hover:brightness-110">
        <img src={perfil} alt="foto de perfil" className="h-full w-full rounded-full object-cover" />
      </button>

      {aberto && (
        <div
          role="menu"
          className="absolute right-0 mt-2 w-60 overflow-hidden rounded-2xl border border-purple-200/70 dark:border-white/10 bg-surface backdrop-blur-xl shadow-[0_20px_50px_-24px_rgba(91,33,182,0.45)] dark:shadow-[0_20px_50px_-24px_rgba(0,0,0,0.8)]"
        >
          {email && (
            <div className="px-4 py-3 border-b border-purple-100 dark:border-white/10">
              <span className="block text-[11px] tracking-[0.15em] text-slate-500 dark:text-purple-200/60">Conectado como</span>
              <span className="block truncate text-sm font-medium normal-case">{email}</span>
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
      )}
    </div>
  )
}

export default UserDropdown
