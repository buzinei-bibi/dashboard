const Input = ({ className = '', ...props }) => {
  return (
    <input
      {...props}
      className={`w-full rounded-xl border border-purple-200 dark:border-white/10 bg-field px-3.5 py-2.5 text-sm placeholder:text-slate-400 dark:placeholder:text-purple-200/30 focus:outline-none focus:border-purple-400 focus:ring-4 focus:ring-purple-400/20 dark:[color-scheme:dark] ${className}`}
    />
  )
}

export default Input
