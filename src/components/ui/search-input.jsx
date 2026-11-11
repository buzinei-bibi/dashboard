import { IoSearch } from "react-icons/io5";

const SearchInput = ({
    value,
    onChange,
    placeholder = "Pesquisar..."
}) => {
    return (
        <div className="relative w-full mb-5">
            <input
                type="text"
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="
                    w-full
                    pl-9 pr-3 py-2.5
                    border
                    rounded-xl
                    text-sm
                    bg-field
                    border-purple-200
                    dark:border-white/10
                    placeholder:text-slate-400
                    dark:placeholder:text-purple-200/30
                    focus:outline-none
                    focus:border-purple-400
                    focus:ring-4
                    focus:ring-purple-400/20
                "
            />
            <IoSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-purple-400" />
        </div>
    );
};

export default SearchInput;
