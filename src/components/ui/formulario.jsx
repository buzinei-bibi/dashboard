import { Link } from 'react-router-dom'
import Card from './card'
import Loading from './loading'

// card de formulário: mostra carregando / não encontrado e os botões voltar e salvar
const Formulario = ({ title, voltarPara, form, children }) => {
  const { carregando, naoEncontrado, salvando, salvar } = form

  if (carregando) {
    return (
      <Card title={title}>
        <Loading inline />
      </Card>
    )
  }

  if (naoEncontrado) {
    return (
      <Card title="REGISTRO NÃO ENCONTRADO">
        <Link to={voltarPara} className="text-purple-700 dark:text-purple-300 font-semibold hover:underline">
          ← VOLTAR PARA A LISTA
        </Link>
      </Card>
    )
  }

  return (
    <Card title={title}>
      {salvando && <Loading text="SALVANDO..." />}

      <form onSubmit={salvar} className="grid gap-4 md:grid-cols-2">
        {children}

        <div className="md:col-span-2 flex items-center justify-between gap-2 pt-4 mt-2 border-t border-purple-100 dark:border-white/10">
          <span className="text-xs text-slate-500 dark:text-purple-200/60">
            <span className="text-fuchsia-600 dark:text-fuchsia-400">*</span> CAMPOS OBRIGATÓRIOS
          </span>
          <div className="flex gap-2">
            <Link
              to={voltarPara}
              className="px-4 py-2.5 rounded-xl border border-purple-200 dark:border-white/15 text-purple-700 dark:text-purple-200 text-sm font-semibold hover:bg-purple-200/40 dark:hover:bg-white/10"
            >
              VOLTAR
            </Link>
            <button type="submit" disabled={salvando} className="btn-primary px-5 py-2.5 text-sm cursor-pointer disabled:opacity-60">
              SALVAR
            </button>
          </div>
        </div>
      </form>
    </Card>
  )
}

export default Formulario
