// aplica uma máscara onde "9" é um dígito, ex: "999.999.999-99"
const aplicarMascara = (valor, mascara) => {
  if (!mascara) return valor

  const numeros = String(valor ?? '').replace(/\D/g, '')
  let resultado = ''
  let i = 0

  for (let m = 0; m < mascara.length && i < numeros.length; m++) {
    if (mascara[m] === '9') {
      resultado += numeros[i]
      i++
    } else {
      resultado += mascara[m]
    }
  }

  return resultado
}

const Input = ({ className = '', mask, onChange, value, ...props }) => {
  const handleChange = (e) => {
    if (!mask) return onChange?.(e)
    onChange?.({ target: { name: e.target.name, value: aplicarMascara(e.target.value, mask) } })
  }

  return (
    <input
      {...props}
      value={value ?? ''}
      onChange={handleChange}
      maxLength={props.maxLength ?? (mask ? mask.length : undefined)}
      className={`w-full rounded-xl border border-purple-200 dark:border-white/10 bg-field px-3.5 py-2.5 text-sm placeholder:text-slate-400 dark:placeholder:text-purple-200/30 focus:outline-none focus:border-purple-400 focus:ring-4 focus:ring-purple-400/20 dark:[color-scheme:dark] ${className}`}
    />
  )
}

export default Input
