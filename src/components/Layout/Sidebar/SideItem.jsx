import React from 'react'
import { NavLink } from 'react-router-dom'

const SideItem = ({ to, icon: Icon, label }) => {
    return (
        <NavLink to={to} className={ ({ isActive }) => 
            `flex items-center gap-2 p-4 justify-start
            text-black dark:text-purple-800 font-semibold
            ${isActive ? 'bg-purple-600 dark:bg-purple-400' : ''}`
        }>
            <Icon className="text-xl" />
            <span>{label}</span>
        </NavLink>
    )
}

export default SideItem
