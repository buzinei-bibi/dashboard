import Avatar from '../../ui/Avatar'

const UserMenu = () => {
  return (
    <button
      type="button"
      className="rounded-full cursor-pointer shadow-glow hover:brightness-110"
      aria-label="menu do usuário"
    >
      <Avatar size="h-11 w-11 block" />
    </button>
  )
}

export default UserMenu
