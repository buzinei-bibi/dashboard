import { useLocation } from 'react-router-dom'
import ThemeToggle from './ThemeToggle'
import UserMenu from './UserMenu'

const titulos = {
  '/': 'Visão geral',
  '/clientes': 'Clientes',
  '/clientes/novo': 'Novo cliente',
}

const Header = () => {
  const { pathname } = useLocation()
  const titulo = titulos[pathname] ?? (pathname.startsWith('/clientes/editar') ? 'Editar cliente' : '')

  return (
    <header className="shrink-0 h-20 px-6 md:px-8 flex items-center justify-between border-b border-purple-200/60 dark:border-white/10 bg-bar backdrop-blur-xl">
      <div className="flex flex-col leading-tight">
        <span className="text-xs text-slate-500 dark:text-purple-200/60">painel administrativo</span>
        <h1 className="text-lg font-semibold">{titulo}</h1>
      </div>

      <div className="flex items-center gap-3">
        <ThemeToggle />
        <UserMenu />
      </div>
    </header>
  )
}

export default Header
