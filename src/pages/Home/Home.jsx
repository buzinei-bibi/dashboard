import { Link } from 'react-router-dom'
import { IoPeopleOutline, IoLocationOutline } from 'react-icons/io5'
import Card from '../../components/ui/Card'
import Avatar from '../../components/ui/Avatar'
import { listarClientes } from '../../services/clientes'

const Stat = ({ icon: Icon, label, value }) => (
  <Card>
    <div className="flex items-center gap-4">
      <span className="h-12 w-12 grid place-items-center rounded-xl bg-accent text-white text-2xl shadow-glow">
        <Icon />
      </span>
      <div>
        <p className="text-sm text-slate-500 dark:text-purple-200/60">{label}</p>
        <p className="text-3xl font-bold text-gradient">{value}</p>
      </div>
    </div>
  </Card>
)

const Home = () => {
  const clientes = listarClientes()
  const cidades = new Set(clientes.map((c) => c.cidade?.trim().toLowerCase()).filter(Boolean)).size
  const ultimos = [...clientes].reverse().slice(0, 3)

  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <Stat icon={IoPeopleOutline} label="clientes cadastrados" value={clientes.length} />
        <Stat icon={IoLocationOutline} label="cidades atendidas" value={cidades} />
      </div>

      <Card title="últimos cadastrados">
        {ultimos.length > 0 ? (
          <ul className="flex flex-col divide-y divide-purple-100 dark:divide-white/5 -my-2">
            {ultimos.map((c) => (
              <li key={c.id} className="flex items-center gap-3 py-3">
                <Avatar size="h-10 w-10" alt={`foto de ${c.nome}`} />
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{c.nome}</p>
                  <p className="text-xs text-slate-500 dark:text-purple-200/60 truncate">{c.email}</p>
                </div>
                <Link
                  to={`/clientes/editar/${c.id}`}
                  className="text-sm font-semibold text-purple-700 dark:text-purple-300 hover:underline"
                >
                  abrir
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-slate-500">nenhum cliente ainda.</p>
        )}
      </Card>
    </div>
  )
}

export default Home
