import React from 'react'
import ThemeToggle from './theme-toggle'
import UserDropdown from './user-dropdown'

const Header = () => {

    return (
        <header className="sticky top-0 left-0 w-full shrink-0 h-20 px-6 md:px-8 flex items-center justify-between border-b border-purple-200/60 dark:border-white/10 bg-bar backdrop-blur-xl z-40">
            <div className="flex flex-col leading-tight">
                <span className="text-xs text-slate-500 dark:text-purple-200/60">Painel Administrativo</span>
                <h1 className="text-lg font-semibold">
                    Dashboard
                </h1>
            </div>

            <div className="flex items-center gap-3">
                <ThemeToggle />
                <UserDropdown />
            </div>

        </header>
    )
}

export default Header
