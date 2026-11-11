import { useLocation } from 'react-router-dom'
import ThemeToggle from './theme-toggle'
import UserMenu from './user-menu'

const titulos = {
  '/': 'VISÃO GERAL',
  '/clientes': 'CLIENTES',
  '/clientes/novo': 'NOVO CLIENTE',
  '/fornecedores': 'FORNECEDORES',
  '/fornecedores/novo': 'NOVO FORNECEDOR',
  '/produtos': 'PRODUTOS',
  '/produtos/novo': 'NOVO PRODUTO',
}

const titulosEditar = {
  clientes: 'EDITAR CLIENTE',
  fornecedores: 'EDITAR FORNECEDOR',
  produtos: 'EDITAR PRODUTO',
}

const Header = () => {
  const { pathname } = useLocation()
  const [, secao, acao] = pathname.split('/')
  const titulo = titulos[pathname] ?? (acao === 'editar' ? titulosEditar[secao] : '') ?? ''

  return (
    <header className="shrink-0 h-20 px-6 md:px-8 flex items-center justify-between border-b border-purple-200/60 dark:border-white/10 bg-bar backdrop-blur-xl">
      <div className="flex flex-col leading-tight">
        <span className="text-xs text-slate-500 dark:text-purple-200/60">PAINEL ADMINISTRATIVO</span>
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
