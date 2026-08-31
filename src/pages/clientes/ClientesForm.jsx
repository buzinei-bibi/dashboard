import React from 'react'
import { Link } from 'react-router-dom'

const ClientesForm = () => {
  return (
    <div>
      <div className="text-2xl font-bold bg-purple-500 text-white flex flex-col justify-center items-center h-10">
        CADASTRO DE CLIENTE
      </div>

      <form className="container mx-auto p-4 bg-pink-200 rounded-lg shadow-md border border-black">
        <div className="mb-4">
          <label className="block mb-2">nome:</label>
          <input 
            name="nome"
            required
            placeholder="digite seu nome"
            className="border border-black rounded p-1 w-full"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2">data de nascimento:</label>
          <input 
            type="date" 
            name="data_nascimento" 
            className="border border-black rounded p-1 w-full"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2">cpf:</label>
          <input 
            name="cpf" 
            placeholder="0000.000.000-00" 
            className="border border-black rounded p-1 w-full"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2">e-mail:</label>
          <input 
            type="email" 
            name="e-mail" 
            placeholder="seu@email.com" 
            className="border border-black rounded p-1 w-full"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2">whatsapp:</label>
          <input 
            name="whatsapp" 
            placeholder="(000) 00000-0000" 
            className="border border-black rounded p-1 w-full"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2">endereço completo:</label>
          <input 
            name="logradouro" 
            placeholder="rua, avenida, etc." 
            className="border border-black rounded p-1 w-full mb-2"
          />
          <input 
            name="número" 
            placeholder="número" 
            className="border border-black rounded p-1 w-full mb-2"
          />
          <input 
            name="complemento" 
            placeholder="bloco, apartamento, etc." 
            className="border border-black rounded p-1 w-full mb-2"
          />
          <input 
            name="bairro" 
            placeholder="digite seu bairro" 
            className="border border-black rounded p-1 w-full mb-2"
          />
          <input 
            name="cidade" 
            placeholder="digite sua cidade" 
            className="border border-black rounded p-1 w-full mb-2"
          />
          <input 
            name="estado" 
            placeholder="digite seu estado" 
            className="border border-black rounded p-1 w-full mb-2"
          />
          <input 
            name="cep" 
            placeholder="00000-000" 
            className="border border-black rounded p-1 w-full"
          />
        </div>
        <div className="md:col-span-2 flex gap-2">
          <Link
            to="/clientes" 
            className="bg-purple-700 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded"
          >
            voltar
          </Link>
        </div>
        <button 
          type="submit" 
          className="bg-purple-800 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
        >
          enviar
        </button>
      </form>
    </div>
  )
}

export default ClientesForm
