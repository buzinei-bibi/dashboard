import { Routes, Route, Navigate, useParams } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Header from './components/layout/header/header'
import Sidebar from './components/layout/sidebar/sidebar'
import Footer from './components/layout/footer/footer'
import Home from './pages/home/home'
import ClientesList from './pages/clientes/clientes-list'
import ClientesForm from './pages/clientes/clientes-form'
import FornecedoresList from './pages/fornecedores/fornecedores-list'
import FornecedoresForm from './pages/fornecedores/fornecedores-form'
import ProdutosList from './pages/produtos/produtos-list'
import ProdutosForm from './pages/produtos/produtos-form'

// recria o formulário ao trocar entre "novo" e "editar", para limpar os campos
const FormRoute = ({ component: Form }) => {
  const { id } = useParams()
  return <Form key={id ?? 'novo'} />
}

// gera as rotas de lista, novo e editar de um cadastro
const rotasCrud = (caminho, List, Form) => [
  <Route key={caminho} path={`/${caminho}`} element={<List />} />,
  <Route key={`${caminho}-novo`} path={`/${caminho}/novo`} element={<FormRoute component={Form} />} />,
  <Route key={`${caminho}-editar`} path={`/${caminho}/editar/:id`} element={<FormRoute component={Form} />} />,
]

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
              {rotasCrud('clientes', ClientesList, ClientesForm)}
              {rotasCrud('fornecedores', FornecedoresList, FornecedoresForm)}
              {rotasCrud('produtos', ProdutosList, ProdutosForm)}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={3500} newestOnTop />
    </div>
  )
}

export default App
