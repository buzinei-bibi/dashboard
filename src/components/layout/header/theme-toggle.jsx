import { useEffect, useState } from 'react'
import { PiMoon, PiSunDim } from 'react-icons/pi'

const ThemeToggle = () => {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light')

  useEffect(() => {
    localStorage.setItem('theme', theme)
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])

  const escuro = theme === 'dark'

  return (
    <button
      type="button"
      onClick={() => setTheme(escuro ? 'light' : 'dark')}
      aria-label={escuro ? 'ativar tema claro' : 'ativar tema escuro'}
      className="h-10 w-10 grid place-items-center rounded-full cursor-pointer text-lg border border-purple-200 dark:border-white/15 bg-field text-purple-700 dark:text-purple-200 hover:brightness-95 dark:hover:brightness-125"
    >
      {escuro ? <PiSunDim /> : <PiMoon />}
    </button>
  )
}

export default ThemeToggle
