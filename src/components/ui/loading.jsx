const Spinner = ({ className = '' }) => (
  <svg className={`animate-spin ${className}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
    <path className="opacity-90" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
  </svg>
)

// inline: dentro de um card (listas). sem inline: cobre a tela toda (salvar, excluir)
const Loading = ({ text = 'CARREGANDO...', inline = false }) => {
  if (inline) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 py-12 text-sm text-slate-500 dark:text-purple-200/60">
        <Spinner className="h-9 w-9 text-purple-600 dark:text-purple-300" />
        {text}
      </div>
    )
  }

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-4 bg-purple-950/40 dark:bg-black/60 backdrop-blur-sm">
      <span className="h-20 w-20 grid place-items-center rounded-2xl bg-accent shadow-glow">
        <Spinner className="h-10 w-10 text-white" />
      </span>
      <p className="text-white text-sm font-semibold tracking-wide">{text}</p>
    </div>
  )
}

export default Loading
