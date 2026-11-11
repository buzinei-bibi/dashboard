import { IoSearch } from 'react-icons/io5'

const SearchInput = ({ value, onChange, placeholder = 'PESQUISAR...' }) => (
  <div className="relative w-full sm:w-96">
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="rounded-xl border border-purple-200 dark:border-white/10 bg-field pl-9 pr-3 py-2.5 text-sm w-full placeholder:text-slate-400 dark:placeholder:text-purple-200/30 focus:outline-none focus:border-purple-400 focus:ring-4 focus:ring-purple-400/20"
    />
    <IoSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-purple-400" />
  </div>
)

export default SearchInput
