import { Routes, Route } from 'react-router-dom'
import Header from './components/Layout/Header/Header'
import Sidebar from './components/Layout/Sidebar/Sidebar'
import ClientesList from './pages/clientes/ClientesList'
import ClientesForm from './pages/clientes/ClientesForm'

function App() {

  return (
    <div className="flex flex-col w-full h-screen overflow-hidden">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-4 bg-white dark:bg-purple-900 font-bold">
          <Routes>
            <Route path="/" element={<h1>HE4RT DEVELOPERS</h1>} />
            <Route path="/profile" element={<ClientesList />} />
            <Route path="/clientes/editar/:id" element={<ClientesForm />} />
            <Route path="/clientes/novo" element={<ClientesForm />} />
          </Routes>

        </main>
      </div>
    </div>
  )
}

export default App
