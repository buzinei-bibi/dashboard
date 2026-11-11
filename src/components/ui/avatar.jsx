import perfil from '../../assets/perfil.png'

// foto redonda com anel em gradiente — usada no perfil e na lista de clientes
const Avatar = ({ size = 'h-9 w-9', alt = 'foto de perfil', className = '' }) => {
  return (
    <span className={`${size} shrink-0 rounded-full p-0.5 bg-accent ${className}`}>
      <img src={perfil} alt={alt} className="h-full w-full rounded-full object-cover" />
    </span>
  )
}

export default Avatar
