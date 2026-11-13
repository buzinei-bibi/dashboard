import { Routes, Route } from "react-router-dom";
import Header from "./components/layout/header/header";
import Sidebar from "./components/layout/sidebar/sidebar";
import ClientsList from "./pages/clientes/clients-list";
import ClientsForm from "./pages/clientes/clients-form";
import VendasList from "./pages/vendas/vendas-list";
import VendasForm from "./pages/vendas/vendas-form";
import { ToastContainer } from 'react-toastify';
import SuppliersList from "./pages/fornecedores/suppliers-list";
import SuppliersForm from "./pages/fornecedores/suppliers-form";
import ProductsList from "./pages/produtos/products-list";
import ProductsForm from "./pages/produtos/products-form";

function App() {
  return (
    <div className="flex w-full h-screen overflow-hidden bg-app text-slate-800 dark:text-slate-100 uppercase">
      <Sidebar />
      <div className="flex flex-col flex-1 min-w-0">
        <Header />
        <main className="flex-1 p-6 md:p-8 overflow-y-auto">
          <Routes>
            <Route path="/" element={<h1 className="text-3xl font-bold text-gradient">Página Inicial</h1>} />
            {/* Rotas para Clientes */}
            <Route path="/clientes" element={<ClientsList />} />
            <Route path="/clientes/novo" element={<ClientsForm />} />
            <Route path="/clientes/edit/:id" element={<ClientsForm />} />
            {/* Rotas para Fornecedores */}
            <Route path="/fornecedores" element={<SuppliersList />} />
            <Route path="/fornecedores/novo" element={<SuppliersForm />} />
            <Route path="/fornecedores/edit/:id" element={<SuppliersForm />} />
            {/* Rotas para Produtos */}
            <Route path="/produtos" element={<ProductsList />} />
            <Route path="/produtos/novo" element={<ProductsForm />} />
            <Route path="/produtos/edit/:id" element={<ProductsForm />} />
            {/* Rotas para Vendas */}
            <Route path="/vendas" element={<VendasList />} />
            <Route path="/vendas/novo" element={<VendasForm />} />
            <Route path="/vendas/edit/:id" element={<VendasForm />} />
          </Routes>
          <ToastContainer />
        </main>
      </div>
    </div>
  );
}

export default App;
