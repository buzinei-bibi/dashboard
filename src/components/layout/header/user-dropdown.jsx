import React from 'react'
import perfil from '../../../assets/perfil.png'

const UserDropdown = () => {
  return (
    <div>
      <button
      className="block h-11 w-11 rounded-full p-0.5 bg-accent shadow-glow hover:cursor-pointer hover:brightness-110">
        <img src={perfil} alt="foto de perfil" className="h-full w-full rounded-full object-cover" />
      </button>
    </div>
  )
}

export default UserDropdown
