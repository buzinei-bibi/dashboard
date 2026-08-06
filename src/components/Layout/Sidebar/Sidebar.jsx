import React from 'react'
import SidebarItem from './SideItem'
import {AiOutlineDashboard} from 'react-icons/ai'
import { IoPersonCircleSharp } from "react-icons/io5";

const Sidebar = () => {
  return (
      <aside className="w-64 h-screen bg-purple-950 dark:bg-dark-purple-800 px-4 py-10">
        <SidebarItem to="/" icon={AiOutlineDashboard} label="DASHBOARD" />
        <SidebarItem to="/profile" icon={IoPersonCircleSharp} label="PROFILE" />
      </aside>
  )
}

export default Sidebar
