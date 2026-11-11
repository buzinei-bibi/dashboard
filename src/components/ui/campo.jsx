// rótulo + campo do formulário; "required" mostra o asterisco
const Campo = ({ label, required = false, className = '', children }) => (
  <label className={`flex flex-col gap-1.5 text-sm font-medium text-slate-700 dark:text-purple-100/80 ${className}`}>
    <span>
      {label}
      {required && <span className="ml-1 text-fuchsia-600 dark:text-fuchsia-400">*</span>}
    </span>
    {children}
  </label>
)

export default Campo
