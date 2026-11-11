import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { IoPeopleOutline, IoLocationOutline } from 'react-icons/io5'
import { PiTruck, PiPackage } from 'react-icons/pi'
import Card from '../../components/ui/card'
import Avatar from '../../components/ui/avatar'
import Loading from '../../components/ui/loading'
import clientesService from '../../services/clientes-service'
import fornecedoresService from '../../services/fornecedores-service'
import produtosService from '../../services/produtos-service'

const Stat = ({ icon: Icon, label, value, to }) => (
  <Link to={to} className="block rounded-2xl hover:-translate-y-0.5 transition-transform">
    <Card>
      <div className="flex items-center gap-4">
        <span className="h-12 w-12 grid place-items-center rounded-xl bg-accent text-white text-2xl shadow-glow">
          <Icon />
        </span>
        <div>
          <p className="text-sm text-slate-500 dark:text-purple-200/60">{label}</p>
          <p className="text-3xl font-bold text-gradient">{value ?? '—'}</p>
        </div>
      </div>
    </Card>
  </Link>
)

// busca a lista na api; se falhar, devolve null (o card mostra "—")
const buscarLista = (service) =>
  service.getAll().then((r) => r?.data ?? [], () => null)

const Home = () => {
  const [dados, setDados] = useState(null)

  useEffect(() => {
    let ativo = true

    Promise.all([buscarLista(clientesService), buscarLista(fornecedoresService), buscarLista(produtosService)]).then(
      ([clientes, fornecedores, produtos]) => {
        if (!ativo) return
        if ([clientes, fornecedores, produtos].includes(null)) toast.error('NÃO FOI POSSÍVEL CARREGAR TODOS OS DADOS DA API')
        setDados({ clientes, fornecedores, produtos })
      }
    )

    return () => {
      ativo = false
    }
  }, [])

  if (!dados) return <Loading inline />

  const { clientes, fornecedores, produtos } = dados
  const cidades = clientes
    ? new Set(clientes.map((c) => c.ENDERECO?.CIDADE?.trim().toLowerCase()).filter(Boolean)).size
    : null
  const ultimos = [...(clientes ?? [])].sort((a, b) => Number(b.ID_CLIENTE) - Number(a.ID_CLIENTE)).slice(0, 3)

  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        <Stat icon={IoPeopleOutline} label="CLIENTES CADASTRADOS" value={clientes?.length} to="/clientes" />
        <Stat icon={IoLocationOutline} label="CIDADES ATENDIDAS" value={cidades} to="/clientes" />
        <Stat icon={PiTruck} label="FORNECEDORES" value={fornecedores?.length} to="/fornecedores" />
        <Stat icon={PiPackage} label="PRODUTOS" value={produtos?.length} to="/produtos" />
      </div>

      <Card title="ÚLTIMOS CLIENTES CADASTRADOS">
        {ultimos.length > 0 ? (
          <ul className="flex flex-col divide-y divide-purple-100 dark:divide-white/5 -my-2">
            {ultimos.map((c) => (
              <li key={c.ID_CLIENTE} className="flex items-center gap-3 py-3">
                <Avatar size="h-10 w-10" alt={`foto de ${c.NOME}`} />
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{c.NOME}</p>
                  <p className="text-xs text-slate-500 dark:text-purple-200/60 truncate">{c.EMAIL}</p>
                </div>
                <Link
                  to={`/clientes/editar/${c.ID_CLIENTE}`}
                  className="text-sm font-semibold text-purple-700 dark:text-purple-300 hover:underline"
                >
                  ABRIR
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-slate-500">NENHUM CLIENTE AINDA.</p>
        )}
      </Card>
    </div>
  )
}

export default Home
