import { Navigate, Outlet, useLocation } from 'react-router-dom'
import Header from "../components/layout/header/header"
import Sidebar from "../components/layout/sidebar/sidebar"
import { estaLogado } from "../services/auth-service"

const MainLayout = () => {
  const location = useLocation()

  // Sem login, qualquer página manda para a tela de login
  if (!estaLogado()) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }

  return (
    <div className="flex w-full h-screen overflow-hidden bg-app text-slate-800 dark:text-slate-100 uppercase">
      <Sidebar />
      <div className="flex flex-col flex-1 min-w-0">
        <Header />
        <main className="flex-1 p-6 md:p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default MainLayout
