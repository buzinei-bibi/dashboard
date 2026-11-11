import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const ehObjeto = (v) => v !== null && typeof v === 'object' && !Array.isArray(v)

// junta o registro da api com o estado inicial (inclusive objetos aninhados, ex: ENDERECO)
const mesclar = (inicial, registro) => {
  const resultado = { ...inicial, ...registro }
  for (const chave of Object.keys(inicial)) {
    if (ehObjeto(inicial[chave])) {
      resultado[chave] = { ...inicial[chave], ...(ehObjeto(registro[chave]) ? registro[chave] : {}) }
    }
  }
  return resultado
}

// altera um campo pelo "name"; aceita caminho com ponto, ex: "ENDERECO.CIDADE"
const definir = (obj, caminho, valor) => {
  const [chave, ...resto] = caminho.split('.')
  if (resto.length === 0) return { ...obj, [chave]: valor }
  return { ...obj, [chave]: definir(obj[chave] ?? {}, resto.join('.'), valor) }
}

// lógica comum dos formulários: carregar pelo id, alterar campos e salvar (post ou put)
export const useFormularioApi = ({ service, id, inicial, voltarPara }) => {
  const navigate = useNavigate()
  const [dados, setDados] = useState(inicial)
  const [carregando, setCarregando] = useState(Boolean(id))
  const [naoEncontrado, setNaoEncontrado] = useState(false)
  const [salvando, setSalvando] = useState(false)

  useEffect(() => {
    if (!id) return
    let ativo = true

    service
      .getByID(id)
      .then((response) => {
        if (!ativo) return
        const registro = response?.data?.[0]
        if (registro) setDados(mesclar(inicial, registro))
        else setNaoEncontrado(true)
      })
      .catch((error) => {
        if (!ativo) return
        toast.error(error.message)
        setNaoEncontrado(true)
      })
      .finally(() => ativo && setCarregando(false))

    return () => {
      ativo = false
    }
  }, [id, service, inicial])

  const alterar = (e) => {
    const { name, value } = e.target
    setDados((prev) => definir(prev, name, value))
  }

  const salvar = async (e) => {
    e.preventDefault()
    setSalvando(true)
    try {
      const response = id ? await service.update(id, dados) : await service.create(dados)
      toast.success(response?.message || 'SALVO COM SUCESSO')
      navigate(voltarPara)
    } catch (error) {
      toast.error(error.message)
      setSalvando(false)
    }
  }

  return { dados, alterar, salvar, carregando, naoEncontrado, salvando }
}
