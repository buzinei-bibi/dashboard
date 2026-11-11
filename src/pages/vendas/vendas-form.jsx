
import React from "react";
import Card from "../../components/layout/card/card";
import { Link, useNavigate, useParams } from "react-router-dom";
import Input from "../../components/ui/input";
import Label from "../../components/ui/label";
import Button from "../../components/ui/button";
import vendasService from "../../services/vendas-service";
import clientesService from "../../services/clientes-service";
import produtosService from "../../services/produtos-service";
import { toast } from "react-toastify";
import Loading from "../../components/loading";

const VendasForm = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const [loading, setLoading] = React.useState(true);

    const [clientes, setClientes] = React.useState([]);
    const [produtos, setProdutos] = React.useState([]);

    const [venda, setVenda] = React.useState({
        ID_VENDA: "",
        DATA: new Date().toISOString().split("T")[0],
        FORMA_PGTO: "Pix",
        STATUS: "Pendente",
        CLIENTE: {
            ID_CLIENTE: "",
        },
        PRODUTOS: [],
    });

    // Carregar clientes, produtos e venda
    React.useEffect(() => {
        const carregarDados = async () => {
            try {
                const [clientesResponse, produtosResponse] =
                    await Promise.all([
                        clientesService.getAll(),
                        produtosService.getAll(),
                    ]);

                setClientes(clientesResponse.data);
                setProdutos(produtosResponse.data);

                // Se for edição, carregar venda
                if (id) {
                    const response = await vendasService.getById(id);
                    const dados = response.data[0];

                    setVenda({
                        ID_VENDA: dados.ID_VENDA,
                        DATA: dados.DATA.split("/").reverse().join("-"),
                        FORMA_PGTO: dados.FORMA_PGTO,
                        STATUS: dados.STATUS,
                        CLIENTE: {
                            ID_CLIENTE: dados.CLIENTE.ID_CLIENTE,
                        },
                        PRODUTOS: dados.PRODUTOS.map((produto) => ({
                            ID_PRODUTO: produto.ID_PRODUTO,
                            PRODUTO: produto.PRODUTO,
                            PRECO_UNIT: produto.PRECO_UNIT,
                            QTDE: produto.QTDE,
                        })),
                    });
                }
            } catch (error) {
                toast.error(error.message);
            } finally {
                setLoading(false);
            }
        };

        carregarDados();
    }, [id]);

    // Atualizar dados da venda
    const handleChange = (campo, valor) => {
        setVenda((prev) => ({
            ...prev,
            [campo]: valor,
        }));
    };

    // Adicionar produto
    const adicionarProduto = () => {
        setVenda((prev) => ({
            ...prev,
            PRODUTOS: [
                ...prev.PRODUTOS,
                {
                    ID_PRODUTO: "",
                    PRODUTO: "",
                    PRECO_UNIT: 0,
                    QTDE: 1,
                },
            ],
        }));
    };

    // Selecionar produto
    const selecionarProduto = (index, idProduto) => {
        const produtoSelecionado = produtos.find(
            (produto) =>
                String(produto.ID_PRODUTO) === String(idProduto)
        );

        if (!produtoSelecionado) return;

        const novosProdutos = [...venda.PRODUTOS];

        novosProdutos[index] = {
            ID_PRODUTO: produtoSelecionado.ID_PRODUTO,
            PRODUTO: produtoSelecionado.PRODUTO,
            PRECO_UNIT: Number(produtoSelecionado.PRECO_UNIT || 0),
            QTDE: 1,
        };

        setVenda((prev) => ({
            ...prev,
            PRODUTOS: novosProdutos,
        }));
    };

    // Alterar quantidade
    const alterarQuantidade = (index, quantidade) => {
        const novosProdutos = [...venda.PRODUTOS];

        novosProdutos[index].QTDE = Number(quantidade);

        setVenda((prev) => ({
            ...prev,
            PRODUTOS: novosProdutos,
        }));
    };

    // Remover produto
    const removerProduto = (index) => {
        setVenda((prev) => ({
            ...prev,
            PRODUTOS: prev.PRODUTOS.filter(
                (_, i) => i !== index
            ),
        }));
    };

    // Calcular total
    const totalVenda = venda.PRODUTOS.reduce(
        (total, produto) =>
            total +
            Number(produto.PRECO_UNIT || 0) *
            Number(produto.QTDE || 0),
        0
    );

    // Salvar venda
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!venda.CLIENTE.ID_CLIENTE) {
            toast.error("Selecione um cliente.");
            return;
        }

        if (venda.PRODUTOS.length === 0) {
            toast.error("Adicione pelo menos um produto.");
            return;
        }

        if (
            venda.PRODUTOS.some(
                (produto) =>
                    !produto.ID_PRODUTO || produto.QTDE <= 0
            )
        ) {
            toast.error("Verifique os produtos e suas quantidades.");
            return;
        }

        setLoading(true);

        try {
            const dadosVenda = {
                ...venda,
                DATA: venda.DATA.split("-").reverse().join("/"),
                CLIENTE: {
                    ID_CLIENTE: Number(venda.CLIENTE.ID_CLIENTE),
                },
                PRODUTOS: venda.PRODUTOS.map((produto) => ({
                    ID_PRODUTO: Number(produto.ID_PRODUTO),
                    QTDE: Number(produto.QTDE),
                })),
            };

            let response;

            if (id) {
                response = await vendasService.update(id, dadosVenda);
            } else {
                response = await vendasService.create(dadosVenda);
            }

            toast.success(response.message);
            navigate("/vendas");
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <Loading />;

    return (
        <Card title="Informações de Vendas">
            <form
                onSubmit={handleSubmit}
                className="w-full grid grid-cols-1 md:grid-cols-2 gap-4"
            >
                {/* Data */}
                <div>
                    <Label htmlFor="data" required>
                        Data da Venda
                    </Label>

                    <Input
                        type="date"
                        id="data"
                        required
                        value={venda.DATA}
                        onChange={(e) =>
                            handleChange("DATA", e.target.value)
                        }
                    />
                </div>

                {/* Cliente */}
                <div>
                    <Label htmlFor="cliente" required>
                        Cliente
                    </Label>

                    <select
                        id="cliente"
                        required
                        value={venda.CLIENTE.ID_CLIENTE}
                        onChange={(e) =>
                            handleChange("CLIENTE", {
                                ID_CLIENTE: e.target.value,
                            })
                        }
                        className="mt-1 block w-full rounded-xl border border-purple-200 dark:border-white/10 bg-field px-3.5 py-2.5 text-sm uppercase focus:outline-none focus:border-purple-400 focus:ring-4 focus:ring-purple-400/20 dark:[color-scheme:dark]"
                    >
                        <option value="">Selecione um cliente</option>

                        {clientes.map((cliente) => (
                            <option
                                key={cliente.ID_CLIENTE}
                                value={cliente.ID_CLIENTE}
                            >
                                {cliente.NOME} - {cliente.CPF}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Forma de pagamento */}
                <div>
                    <Label htmlFor="forma_pgto" required>
                        Forma de Pagamento
                    </Label>

                    <select
                        id="forma_pgto"
                        required
                        value={venda.FORMA_PGTO}
                        onChange={(e) =>
                            handleChange("FORMA_PGTO", e.target.value)
                        }
                        className="mt-1 block w-full rounded-xl border border-purple-200 dark:border-white/10 bg-field px-3.5 py-2.5 text-sm uppercase focus:outline-none focus:border-purple-400 focus:ring-4 focus:ring-purple-400/20 dark:[color-scheme:dark]"
                    >
                        <option value="Pix">Pix</option>
                        <option value="Dinheiro">Dinheiro</option>
                        <option value="Cartão de Crédito">
                            Cartão de Crédito
                        </option>
                        <option value="Cartão de Débito">
                            Cartão de Débito
                        </option>
                        <option value="Boleto">Boleto</option>
                    </select>
                </div>

                {/* Status */}
                <div>
                    <Label htmlFor="status" required>
                        Status
                    </Label>

                    <select
                        id="status"
                        required
                        value={venda.STATUS}
                        onChange={(e) =>
                            handleChange("STATUS", e.target.value)
                        }
                        className="mt-1 block w-full rounded-xl border border-purple-200 dark:border-white/10 bg-field px-3.5 py-2.5 text-sm uppercase focus:outline-none focus:border-purple-400 focus:ring-4 focus:ring-purple-400/20 dark:[color-scheme:dark]"
                    >
                        <option value="Pendente">Pendente</option>
                        <option value="Em andamento">Em andamento</option>
                        <option value="Finalizado">Finalizado</option>
                        <option value="Cancelado">Cancelado</option>
                    </select>
                </div>

                {/* Produtos */}
                <div className="md:col-span-2 border-t border-purple-100 dark:border-white/10 pt-4">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-semibold text-lg">
                            Produtos da Venda
                        </h3>

                        <Button
                            type="button"
                            onClick={adicionarProduto}
                            className="btn-primary"
                        >
                            + Adicionar Produto
                        </Button>
                    </div>

                    {venda.PRODUTOS.map((produto, index) => (
                        <div
                            key={index}
                            className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-4 p-3 border border-purple-100 dark:border-white/10 rounded-xl"
                        >
                            {/* Produto */}
                            <div className="md:col-span-2">
                                <Label>Produto</Label>

                                <select
                                    required
                                    value={produto.ID_PRODUTO}
                                    onChange={(e) =>
                                        selecionarProduto(index, e.target.value)
                                    }
                                    className="mt-1 block w-full rounded-xl border border-purple-200 dark:border-white/10 bg-field px-3.5 py-2.5 text-sm uppercase focus:outline-none focus:border-purple-400 focus:ring-4 focus:ring-purple-400/20 dark:[color-scheme:dark]"
                                >
                                    <option value="">
                                        Selecione um produto
                                    </option>

                                    {produtos.map((item) => (
                                        <option
                                            key={item.ID_PRODUTO}
                                            value={item.ID_PRODUTO}
                                        >
                                            {item.PRODUTO}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Preço unitário */}
                            <div>
                                <Label>Preço Unitário</Label>

                                <Input
                                    type="text"
                                    value={Number(produto.PRECO_UNIT).toLocaleString(
                                        "pt-BR",
                                        {
                                            style: "currency",
                                            currency: "BRL",
                                        }
                                    )}
                                    readOnly
                                />
                            </div>

                            {/* Quantidade */}
                            <div>
                                <Label>Quantidade</Label>

                                <Input
                                    type="number"
                                    min="1"
                                    required
                                    value={produto.QTDE}
                                    onChange={(e) =>
                                        alterarQuantidade(index, e.target.value)
                                    }
                                />
                            </div>

                            {/* Subtotal */}
                            <div className="md:col-span-3">
                                <Label>Subtotal</Label>

                                <p className="font-semibold text-gradient pt-2">
                                    {(
                                        Number(produto.PRECO_UNIT) *
                                        Number(produto.QTDE)
                                    ).toLocaleString("pt-BR", {
                                        style: "currency",
                                        currency: "BRL",
                                    })}
                                </p>
                            </div>

                            {/* Remover */}
                            <div className="flex items-end">
                                <Button
                                    type="button"
                                    onClick={() => removerProduto(index)}
                                    className="bg-red-600 hover:bg-red-700 text-white"
                                >
                                    Remover
                                </Button>
                            </div>
                        </div>
                    ))}

                    {venda.PRODUTOS.length === 0 && (
                        <p className="text-slate-500 dark:text-purple-200/60 text-center py-4">
                            Nenhum produto adicionado.
                        </p>
                    )}
                </div>

                {/* Total */}
                <div className="md:col-span-2 flex justify-end border-t border-purple-100 dark:border-white/10 pt-4">
                    <div className="text-right">
                        <span className="text-slate-500 dark:text-purple-200/60">
                            Total da Venda
                        </span>

                        <p className="text-2xl font-bold text-gradient">
                            {totalVenda.toLocaleString("pt-BR", {
                                style: "currency",
                                currency: "BRL",
                            })}
                        </p>
                    </div>
                </div>

                {/* Botões */}
                <div className="md:col-span-2 flex gap-2 pt-2">
                    <Link to="/vendas">
                        <Button
                            type="button"
                            className="border border-purple-200 dark:border-white/15 text-purple-700 dark:text-purple-200 hover:bg-purple-200/40 dark:hover:bg-white/10"
                        >
                            Cancelar
                        </Button>
                    </Link>

                    <Button
                        type="submit"
                        className="btn-primary"
                    >
                        Enviar
                    </Button>
                </div>
            </form>
        </Card>
    );
};

export default VendasForm;
