// mostra o valor de uma coluna: usa o render da coluna ou o campo direto do registro
const valorDaColuna = (column, row) =>
    column.render ? column.render(row) : row[column.accessor];

const Table = ({
    columns = [],
    data = [],
}) => {
    return (
        <>
            {/* celular e tablet: cada registro vira um cartão com "coluna: valor" */}
            <div className="lg:hidden space-y-2.5">
                {data.map((row, index) => (
                    <div
                        key={index}
                        className="rounded-xl border border-black dark:border-white/10 bg-purple-200/10 dark:bg-white/[0.02] p-3 space-y-1.5"
                    >
                        {/* colunas marcadas com cardTopo (ex.: imagem) aparecem grandes no topo, sem título */}
                        {columns.filter((column) => column.cardTopo).map((column) => (
                            <div key={column.accessor} className="empty:hidden">
                                {column.renderCard ? column.renderCard(row) : valorDaColuna(column, row)}
                            </div>
                        ))}

                        {columns.filter((column) => !column.cardTopo).map((column) => (
                            <div
                                key={column.accessor}
                                className="flex items-start justify-between gap-3 text-xs"
                            >
                                <span className="shrink-0 text-[11px] font-semibold tracking-wider text-purple-700/80 dark:text-purple-200/70">
                                    {column.header}
                                </span>
                                <div className="min-w-0 flex justify-end text-right break-words">
                                    {valorDaColuna(column, row)}
                                </div>
                            </div>
                        ))}
                    </div>
                ))}
            </div>

            {/* computador: tabela normal */}
            <div className="hidden lg:block overflow-x-auto rounded-xl border border-purple-100 dark:border-white/10">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="bg-purple-200/40 dark:bg-white/[0.04]">
                            {columns.map((column) => (
                                <th
                                    key={column.accessor}
                                    className={`
                                    px-4 py-3
                                    text-left
                                    text-xs
                                    font-semibold
                                    tracking-wider
                                    text-purple-700/80
                                    dark:text-purple-200/70
                                    `}
                                >
                                    {column.header}
                                </th>
                            ))}
                        </tr>
                    </thead>

                    <tbody>
                        {data.map((row, index) => (
                            <tr
                                key={index}
                                className="
                                    border-t
                                    border-purple-100
                                    dark:border-white/5
                                    hover:bg-purple-200/30
                                    dark:hover:bg-white/[0.04]
                                "
                            >
                                {columns.map((column) => (
                                    <td
                                        key={column.accessor}
                                        className="px-4 py-3"
                                    >
                                        {valorDaColuna(column, row)}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default Table;
