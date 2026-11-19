import { useState } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import Header from "../components/layout/header/header"
import Sidebar from "../components/layout/sidebar/sidebar"
import { estaLogado } from "../services/auth-service"

const MainLayout = () => {
  const location = useLocation()
  // no celular o menu fica escondido e abre pelo botão ☰ do header
  const [menuAberto, setMenuAberto] = useState(false)

  // Sem login, qualquer página manda para a tela de login
  if (!estaLogado()) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }

  return (
    <div className="flex w-full h-dvh overflow-hidden bg-app text-slate-800 dark:text-slate-100 uppercase">
      <Sidebar aberto={menuAberto} onFechar={() => setMenuAberto(false)} />
      <div className="flex flex-col flex-1 min-w-0">
        <Header onAbrirMenu={() => setMenuAberto(true)} />
        <main className="flex-1 p-4 sm:p-6 md:p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default MainLayout
