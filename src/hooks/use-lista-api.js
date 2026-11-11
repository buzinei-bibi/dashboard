import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

// lógica comum das listas: carregar, buscar (com espera de 500ms) e excluir
export const useListaApi = (service) => {
  const [itens, setItens] = useState([])
  const [busca, setBusca] = useState('')
  const [carregando, setCarregando] = useState(true)
  const [processando, setProcessando] = useState(false)
  const [excluirId, setExcluirId] = useState(null)
  const [versao, setVersao] = useState(0)

  useEffect(() => {
    let ativo = true
    const termo = busca.trim()

    // espera o usuário parar de digitar antes de chamar a api
    const timer = setTimeout(async () => {
      setCarregando(true)
      try {
        const dados = termo ? await service.getBySearch(termo) : await service.getAll()
        if (ativo) setItens(dados?.data ?? [])
      } catch (error) {
        if (ativo) {
          setItens([])
          toast.error(error.message)
        }
      } finally {
        if (ativo) setCarregando(false)
      }
    }, termo ? 500 : 0)

    return () => {
      ativo = false
      clearTimeout(timer)
    }
  }, [service, busca, versao])

  const confirmarExclusao = async () => {
    const id = excluirId
    setExcluirId(null)
    setProcessando(true)
    try {
      const response = await service.delete(id)
      toast.success(response?.message || 'REGISTRO EXCLUÍDO')
    } catch (error) {
      toast.error(error.message)
    } finally {
      setProcessando(false)
      setVersao((v) => v + 1)
    }
  }

  return {
    itens,
    busca,
    setBusca,
    carregando,
    processando,
    modalAberto: excluirId !== null,
    pedirExclusao: setExcluirId,
    cancelarExclusao: () => setExcluirId(null),
    confirmarExclusao,
  }
}
