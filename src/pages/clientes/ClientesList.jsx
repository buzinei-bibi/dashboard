import React from 'react'
import Card from '../../components/Layout/Card/Card'
import Table from '../../components/Layout/Table/Table'

const ClientsList = () => {
  const clientes = [
    {
      id: 1,
      nome: "buzina",
      email: "buzina@email.com",
      cidade: "taubaté",
    },
    {
      id: 2,
      nome: "buzinei-bibi",
      email: "buzinei@email.com",
      cidade: "são paulo",
    },
  ];

  const columns = [
  {
    header: "código",
    accessor: "id",
  },
  {
    header: "nome",
    accessor: "nome",
  },
  {
    header: "e-mail",
    accessor: "email",
  },
  {
    header: "cidade",
    accessor: "cidade",
  },
  {
    header: "ações",
    accessor: "acoes",
    render: (clientes) => (
      <button
        className="
          px-3 py-1
          bg-blue-600
          text-white
          rounded-lg
        "
      >
        editar
      </button>
    ),
  },
];

  return (
    <Card title="lista de clientes" button="clientes">
      <Table data={clientes} columns={columns} />
    </Card>
  )
}

export default ClientsList
