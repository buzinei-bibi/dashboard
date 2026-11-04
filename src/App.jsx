import { Routes, Route, Navigate, useParams } from 'react-router-dom'
import Header from './components/layout/Header/Header'
import Sidebar from './components/layout/Sidebar/Sidebar'
import Footer from './components/layout/Footer/Footer'
import Home from './pages/Home/Home'
import ClientesList from './pages/Clientes/ClientesList'
import ClientesForm from './pages/Clientes/ClientesForm'

// recria o formulário ao trocar entre "novo" e "editar", para limpar os campos
const ClientesFormRoute = () => {
  const { id } = useParams()
  return <ClientesForm key={id ?? 'novo'} />
}

function App() {
  return (
    <div className="flex w-full h-screen overflow-hidden bg-app text-slate-800 dark:text-slate-100 uppercase">
      <Sidebar />
      <div className="flex flex-col flex-1 min-w-0">
        <Header />
        <div className="flex flex-col flex-1 overflow-y-auto">
          <main className="flex-1 p-6 md:p-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/clientes" element={<ClientesList />} />
              <Route path="/clientes/novo" element={<ClientesFormRoute />} />
              <Route path="/clientes/editar/:id" element={<ClientesFormRoute />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </div>
    </div>
  )
}

export default App
