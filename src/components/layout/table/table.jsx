const Table = ({
    columns = [],
    data = [],
}) => {
    return (
        <div className="overflow-x-auto rounded-xl border border-purple-100 dark:border-white/10">
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
                                    {column.render
                                        ? column.render(row)
                                        : row[column.accessor]}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Table;
