import { useEffect, useRef, useState } from "react";
import { IoSearch } from "react-icons/io5";

// deixa sempre um espaço antes dos três pontos: "cidade..." vira "cidade ..."
const comReticencias = (texto) => `${texto.replace(/\s*\.+$/, "")} ...`;

// "Pesquisar cliente por nome, CPF ou cidade..." vira "Pesquisar cliente ..."
const textoCurto = (texto) => comReticencias(texto.split(/ por /i)[0]);

// verifica se o texto cabe dentro do campo, usando a mesma fonte do campo
const textoCabe = (input, texto) => {
    const estilo = getComputedStyle(input);
    const contexto = document.createElement("canvas").getContext("2d");
    contexto.font = `${estilo.fontWeight} ${estilo.fontSize} ${estilo.fontFamily}`;

    // o painel mostra tudo em maiúsculo, então mede em maiúsculo também
    const textoNaTela = estilo.textTransform === "uppercase" ? texto.toUpperCase() : texto;

    const espacoLivre = input.clientWidth - parseFloat(estilo.paddingLeft) - parseFloat(estilo.paddingRight);
    return contexto.measureText(textoNaTela).width <= espacoLivre;
};

const SearchInput = ({
    value,
    onChange,
    placeholder = "Pesquisar..."
}) => {
    const inputRef = useRef(null);
    const [usarCurto, setUsarCurto] = useState(false);

    // sempre que o campo muda de largura (celular, girar a tela, abrir o menu...),
    // confere se o texto inteiro cabe; se não couber, mostra a versão curta
    useEffect(() => {
        const input = inputRef.current;
        if (!input) return;

        const observador = new ResizeObserver(() => {
            setUsarCurto(!textoCabe(input, comReticencias(placeholder)));
        });
        observador.observe(input);

        return () => observador.disconnect();
    }, [placeholder]);

    return (
        <div className="relative w-full mb-5">
            <input
                ref={inputRef}
                type="text"
                value={value}
                onChange={onChange}
                placeholder={usarCurto ? textoCurto(placeholder) : comReticencias(placeholder)}
                // leitores de tela e o "balãozinho" do mouse sempre mostram o texto completo
                aria-label={placeholder}
                title={placeholder}
                className="
                    w-full
                    pl-9 pr-3 py-2.5
                    border
                    rounded-xl
                    text-sm
                    text-ellipsis
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
            <IoSearch className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-purple-400" />
        </div>
    );
};

export default SearchInput;
