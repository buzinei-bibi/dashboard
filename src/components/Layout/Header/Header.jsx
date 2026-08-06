import React from 'react'
import Theme from './Theme'
import UseDropdown from './UseDropdown' 

const Header = () => {
  return (
    <header className="sticky top-0 left-0 bg-purple-950 dark:bg-purple-800 text-white p-4 justify-around items-center flex">
      <div className="flex items-center gap-2">
        <img src="src/assets/he4rt developers.png" alt="logotipo" className="h-8" />
        <h1 className="text-2xl font-semibold">HE4RT DEVELOPERS</h1>
      </div>

      <div className="flex items-center gap-7">
        <Theme />
        <UseDropdown />
      </div>

    </header>
  )
}

export default Header
