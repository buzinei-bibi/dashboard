import React from 'react'
import { HiMenu } from 'react-icons/hi'
import ThemeToggle from './theme-toggle'
import UserDropdown from './user-dropdown'

const Header = ({ onAbrirMenu }) => {

    return (
        <header className="sticky top-0 left-0 w-full shrink-0 h-16 md:h-20 px-4 sm:px-6 md:px-8 flex items-center justify-between gap-3 border-b border-purple-200/60 dark:border-white/10 bg-bar backdrop-blur-xl z-30">
            <div className="flex items-center gap-3 min-w-0">
                {/* botão ☰ que abre o menu, só no celular */}
                <button
                    type="button"
                    onClick={onAbrirMenu}
                    aria-label="abrir menu"
                    className="md:hidden grid h-10 w-10 shrink-0 place-items-center rounded-full text-xl border border-purple-200 dark:border-white/15 bg-field text-purple-700 dark:text-purple-200 cursor-pointer"
                >
                    <HiMenu />
                </button>

                <h1 className="text-base md:text-lg font-semibold truncate">
                    Painel
                </h1>
            </div>

            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                <ThemeToggle />
                <UserDropdown />
            </div>

        </header>
    )
}

export default Header
