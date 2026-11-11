import React from 'react'
import Loading from '../../components/loading'
import Card from '../../components/layout/card/card'
import Table from '../../components/layout/table/table'
import Button from '../../components/ui/button'
import Modal from '../../components/ui/modal'
import SearchInput from '../../components/ui/search-input'
import clientesService from '../../services/clientes-service'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { BsPencilFill, BsTrashFill } from 'react-icons/bs'

const ClientsList = () => {
  const [loading, setLoading] = React.useState(true);
  const [clientes, setClientes] = React.useState([]);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [clienteId, setClienteId] = React.useState(null);
  const [search, setSearch] = React.useState("");

  const handleDelete = async () => {
    try {
      setLoading(true);

      const response = await clientesService.delete(clienteId)
      const { status, message } = response

      toast.success(message)
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false)
      setModalOpen(false)
      carregarLista()
    }
  }

  // Função para carregar registros da tabela
  const carregarLista = async (busca) => {
    try {
      setLoading(true);
      const dados = busca
        ? await clientesService.getBySearch(busca)
        : await clientesService.getAll()
      // Verifica se a resposta da API é nula
      if (dados === null) {
        setClientes([])
        toast.info("Nenhum registro encontrado")
      } else {
        setClientes(dados.data)
      }
    } catch (error) {
      setClientes([])
      toast.error(error.message)
    } finally {
      setLoading(false);
    }
  }

  React.useEffect(() => {
    const timer = setTimeout(() => {
      carregarLista(search)
    }, 500)
    return () => clearTimeout(timer)
  }, [search])

  const columns = [
    {
      header: "Código",
      accessor: "ID_CLIENTE",
    },
    {
      header: "Nome",
      accessor: "NOME",
    },
    {
      header: "CPF",
      accessor: "CPF",
    },
    {
      header: "Cidade",
      accessor: "CIDADE",
      render: (row) => row.ENDERECO.CIDADE
    },
    {
      header: "Ações",
      accessor: "acoes",
      render: (row) => (
        <div className="flex gap-2">
          <Link to={`/clientes/edit/${row.ID_CLIENTE}`}>
            <Button
              className="
              text-purple-700 dark:text-purple-300 hover:bg-purple-200/40 dark:hover:bg-white/10
              "
            >
              <BsPencilFill />
            </Button>
          </Link>

          <Button
            onClick={() => {
              setClienteId(row.ID_CLIENTE)
              setModalOpen(true)
              console.log("Id => ", row.ID_CLIENTE)
            }}
            className="text-red-600 dark:text-red-400 hover:bg-red-100/70 dark:hover:bg-red-500/10"
          >
            <BsTrashFill />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <Card title="Lista de Clientes" button="clientes">
      <SearchInput
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Pesquisar cliente por nome, CPF ou cidade..."
      />
      {loading ? (
        <Loading />
      ) : (
        <Table data={clientes} columns={columns} />
      )}
      <Modal
        open={modalOpen}
        onConfirm={handleDelete}
        onCancel={() => setModalOpen(false)}
      />
    </Card>
  )
}

export default ClientsList
