import Avatar from '../../ui/avatar'

const UserMenu = () => {
  return (
    <button
      type="button"
      className="rounded-full cursor-pointer shadow-glow hover:brightness-110"
      aria-label="MENU DO USUÁRIO"
    >
      <Avatar size="h-11 w-11 block" />
    </button>
  )
}

export default UserMenu
