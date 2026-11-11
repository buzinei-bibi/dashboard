import React from 'react'
import { AiOutlineDashboard } from "react-icons/ai";
import { IoPeopleOutline } from "react-icons/io5";
import { PiTruck, PiPackage } from "react-icons/pi";
import SidebarItem from './sidebar-item'
import logo from '../../../assets/logo.png'

const Sidebar = () => {
    return (
        <aside className="relative w-20 md:w-64 h-full shrink-0 bg-brand text-white flex flex-col overflow-hidden z-40">
            {/* brilho decorativo */}
            <div className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-fuchsia-400/25 blur-3xl" />
            <div className="pointer-events-none absolute bottom-0 -left-20 h-56 w-56 rounded-full bg-violet-300/15 blur-3xl" />

            <div className="relative flex items-center justify-center md:justify-start gap-3 px-5 md:px-6 h-20">
                <img src={logo} alt="Voltar para home" className="h-8 w-auto drop-shadow-[0_4px_12px_rgba(255,255,255,0.35)]" />
                <div className="hidden md:flex flex-col leading-tight">
                    <span className="font-bold tracking-wide">HE4RT</span>
                    <span className="text-[11px] tracking-[0.2em] text-white/60">DEVELOPERS</span>
                </div>
            </div>

            <nav className="relative flex flex-col gap-1 px-3 mt-4">
                <span className="hidden md:block px-3 pb-2 text-[11px] tracking-[0.2em] text-white/50">MENU</span>
                <SidebarItem to="/" icon={AiOutlineDashboard} label="Dashboard" />
                <SidebarItem to="clientes" icon={IoPeopleOutline} label="Clientes" />
                <SidebarItem to="fornecedores" icon={PiTruck} label="Fornecedores" />
                <SidebarItem to="produtos" icon={PiPackage} label="Produtos" />
            </nav>
        </aside>
    )
}

export default Sidebar
