import React from 'react'
import { AiOutlineDashboard } from "react-icons/ai";
import { IoPeopleOutline, IoClose } from "react-icons/io5";
import { PiTruck, PiPackage, PiShoppingCart, PiShoppingBag } from "react-icons/pi";
import SidebarItem from './sidebar-item'
import logo from '../../../assets/logo.png'

// no computador (md pra cima) a sidebar fica sempre aberta ao lado do conteúdo;
// no celular ela vira uma gaveta que entra pela esquerda quando "aberto" é true
const Sidebar = ({ aberto = false, onFechar }) => {
    return (
        <>
            {/* fundo escuro atrás do menu no celular: clicar nele fecha o menu */}
            <div
                onClick={onFechar}
                aria-hidden="true"
                className={`fixed inset-0 z-40 bg-purple-950/50 backdrop-blur-sm md:hidden ${aberto ? 'block' : 'hidden'}`}
            />

            <aside
                className={`
                    fixed inset-y-0 left-0 z-50 w-64 h-full shrink-0 bg-brand text-white flex flex-col overflow-hidden
                    transition-transform duration-300
                    ${aberto ? 'translate-x-0' : '-translate-x-full'}
                    md:relative md:translate-x-0 md:z-40
                `}
            >
                {/* brilho decorativo */}
                <div className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-fuchsia-400/25 blur-3xl" />
                <div className="pointer-events-none absolute bottom-0 -left-20 h-56 w-56 rounded-full bg-violet-300/15 blur-3xl" />

                <div className="relative flex items-center justify-start gap-3 px-6 h-16 md:h-20">
                    <img src={logo} alt="Voltar para home" className="h-8 w-auto drop-shadow-[0_4px_12px_rgba(255,255,255,0.35)]" />
                    <div className="flex flex-col leading-tight">
                        <span className="font-bold tracking-wide">HE4RT</span>
                        <span className="text-[11px] tracking-[0.2em] text-white/60">DEVELOPERS</span>
                    </div>

                    {/* botão fechar, só no celular */}
                    <button
                        type="button"
                        onClick={onFechar}
                        aria-label="fechar menu"
                        className="ml-auto grid h-9 w-9 place-items-center rounded-full text-2xl text-white/80 hover:bg-white/10 hover:text-white cursor-pointer md:hidden"
                    >
                        <IoClose />
                    </button>
                </div>

                {/* clicar em qualquer link fecha o menu do celular */}
                <nav onClick={onFechar} className="relative flex flex-col gap-1 px-3 mt-4">
                    <span className="px-3 pb-2 text-[11px] tracking-[0.2em] text-white/50">MENU</span>
                    <SidebarItem to="/" icon={AiOutlineDashboard} label="Dashboard" />
                    <SidebarItem to="clientes" icon={IoPeopleOutline} label="Clientes" />
                    <SidebarItem to="fornecedores" icon={PiTruck} label="Fornecedores" />
                    <SidebarItem to="produtos" icon={PiPackage} label="Produtos" />
                    <SidebarItem to="vendas" icon={PiShoppingCart} label="Vendas" />
                    <SidebarItem to="compras" icon={PiShoppingBag} label="Compras" />
                </nav>
            </aside>
        </>
    )
}

export default Sidebar
