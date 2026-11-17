import { Routes, Route } from "react-router-dom";
import Header from "./components/layout/header/header";
import Sidebar from "./components/layout/sidebar/sidebar";
import ClientsList from "./pages/clientes/clients-list";
import ClientsForm from "./pages/clientes/clients-form";
import VendasList from "./pages/vendas/vendas-list";
import VendasForm from "./pages/vendas/vendas-form";
import ComprasForm from "./pages/compras/compras-form";
import ComprasList from "./pages/compras/compras-list";
import { ToastContainer } from 'react-toastify';
import SuppliersList from "./pages/fornecedores/suppliers-list";
import SuppliersForm from "./pages/fornecedores/suppliers-form";
import ProductsList from "./pages/produtos/products-list";
import ProductsForm from "./pages/produtos/products-form";
import Home from "./pages/home/home";
import Login from "./pages/login/login";
import MainLayout from "./pages/mainlayout";

function App() {
  return (
    <>
          <Routes>
              {/* rota para login */}
            <Route path="/login" element={<Login />} />
            <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
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
            {/* Rotas para Compras */}
            <Route path="/compras" element={<ComprasList />} />
            <Route path="/compras/novo" element={<ComprasForm />} />
            <Route path="/compras/edit/:id" element={<ComprasForm />} />
                </Route>
          </Routes>
          <ToastContainer />
              </>
  );
}

export default App;
