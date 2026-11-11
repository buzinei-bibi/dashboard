import { NavLink } from 'react-router-dom'

const SidebarItem = ({ to, icon: Icon, label, end = false }) => {
  return (
    <NavLink
      to={to}
      end={end}
      title={label}
      className={({ isActive }) =>
        `flex items-center justify-center md:justify-start gap-3 px-3 py-2.5 rounded-xl text-sm font-medium
        ${isActive
          ? 'bg-white/20 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.25)] ring-1 ring-white/20'
          : 'text-white/70 hover:text-white hover:bg-white/10'}`
      }
    >
      <Icon className="text-xl shrink-0" />
      <span className="hidden md:inline">{label}</span>
    </NavLink>
  )
}

export default SidebarItem
