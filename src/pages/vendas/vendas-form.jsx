
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
import { HiPlus, HiTrash, HiShoppingCart } from "react-icons/hi";
import Loading from "../../components/loading";
import {
    FORMAS_PAGAMENTO,
    STATUS_VENDA,
    valorFormaPagamento,
    valorStatus,
} from "./vendas-opcoes";

const VendasForm = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const [loading, setLoading] = React.useState(true);

    const [clientes, setClientes] = React.useState([]);
    const [produtos, setProdutos] = React.useState([]);

    const [venda, setVenda] = React.useState({
        ID_VENDA: "",
        DATA: new Date().toISOString().split("T")[0],
        FORMA_PGTO: FORMAS_PAGAMENTO[0].value,
        STATUS: STATUS_VENDA[0].value,
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
                        FORMA_PGTO: valorFormaPagamento(dados.FORMA_PGTO),
                        STATUS: valorStatus(dados.STATUS),
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
            toast.error("selecione um cliente.");
            return;
        }

        if (venda.PRODUTOS.length === 0) {
            toast.error("adicione pelo menos um produto.");
            return;
        }

        if (
            venda.PRODUTOS.some(
                (produto) =>
                    !produto.ID_PRODUTO || produto.QTDE <= 0
            )
        ) {
            toast.error("verifique os produtos e suas quantidades.");
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

    const selectClass =
        "mt-1 block w-full rounded-xl border border-purple-200 dark:border-white/10 bg-field px-3.5 py-2.5 text-sm uppercase focus:outline-none focus:border-purple-400 focus:ring-4 focus:ring-purple-400/20 dark:[color-scheme:dark]";

    const formatarMoeda = (valor) =>
        Number(valor || 0).toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
        });

    return (
        <form
            onSubmit={handleSubmit}
            className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-3 gap-6 items-start"
        >
            {/* Informações da venda */}
            <Card title="informações da venda">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
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
                            className={selectClass}
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
                            className={selectClass}
                        >
                            {FORMAS_PAGAMENTO.map((opcao) => (
                                <option key={opcao.value} value={opcao.value}>
                                    {opcao.label}
                                </option>
                            ))}
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
                            className={selectClass}
                        >
                            {STATUS_VENDA.map((opcao) => (
                                <option key={opcao.value} value={opcao.value}>
                                    {opcao.label}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </Card>

            {/* Produtos da venda */}
            <Card
                title="Produtos da Venda"
                className="lg:col-span-2"
                actions={
                    <Button
                        type="button"
                        onClick={adicionarProduto}
                        className="btn-primary inline-flex items-center gap-1.5"
                    >
                        <HiPlus /> Adicionar Produto
                    </Button>
                }
            >
                <div className="@container">
                    {venda.PRODUTOS.length > 0 && (
                        <div className="hidden @xl:grid grid-cols-12 gap-2 px-2.5 pb-1 text-xs font-medium text-slate-500 dark:text-purple-200/60">
                            <span className="col-span-5">produto</span>
                            <span className="col-span-2">preço</span>
                            <span className="col-span-2">quantidade</span>
                            <span className="col-span-2 text-right">subtotal</span>
                            <span className="col-span-1" />
                        </div>
                    )}

                    <div className="space-y-1.5">
                        {venda.PRODUTOS.map((produto, index) => (
                            <div
                                key={index}
                                className="grid grid-cols-[auto_4.5rem_1fr_auto] @xl:grid-cols-12 gap-2 items-center px-2.5 py-2 border border-purple-100 dark:border-white/10 rounded-xl"
                            >
                                {/* Produto */}
                                <div className="col-span-4 @xl:col-span-5">
                                    <select
                                        required
                                        aria-label="Produto"
                                        value={produto.ID_PRODUTO}
                                        onChange={(e) =>
                                            selecionarProduto(index, e.target.value)
                                        }
                                        className={`${selectClass} py-1.5! mt-0!`}
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
                                <div className="@xl:col-span-2">
                                    <p className="text-sm whitespace-nowrap">
                                        {formatarMoeda(produto.PRECO_UNIT)}
                                        <span className="@xl:hidden text-slate-500 dark:text-purple-200/60">
                                            {" "}×
                                        </span>
                                    </p>
                                </div>

                                {/* Quantidade */}
                                <div className="@xl:col-span-2">
                                    <Input
                                        type="number"
                                        min="1"
                                        required
                                        value={produto.QTDE}
                                        onChange={(e) =>
                                            alterarQuantidade(index, e.target.value)
                                        }
                                        className="py-1.5! mt-0!"
                                    />
                                </div>

                                {/* Subtotal */}
                                <div className="text-right @xl:col-span-2">
                                    <p className="font-semibold text-gradient whitespace-nowrap">
                                        {formatarMoeda(
                                            Number(produto.PRECO_UNIT) *
                                            Number(produto.QTDE)
                                        )}
                                    </p>
                                </div>

                                {/* Remover */}
                                <div className="flex justify-end @xl:col-span-1">
                                    <button
                                        type="button"
                                        onClick={() => removerProduto(index)}
                                        title="Remover produto"
                                        className="p-1.5 rounded-lg text-red-500 hover:bg-red-500/10 transition-colors cursor-pointer"
                                    >
                                        <HiTrash className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {venda.PRODUTOS.length === 0 && (
                    <div className="flex items-center justify-center gap-2 py-4 rounded-xl border border-dashed border-purple-200 dark:border-white/10 text-slate-500 dark:text-purple-200/60">
                        <HiShoppingCart className="w-5 h-5 opacity-60" />
                        <p className="text-sm">nenhum produto adicionado.</p>
                    </div>
                )}

                {/* Botões + total */}
                <div className="mt-4 pt-3 border-t border-purple-100 dark:border-white/10 flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div className="flex gap-2">
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

                    <div className="text-right">
                        <span className="text-xs text-slate-500 dark:text-purple-200/60">
                            Total da Venda
                        </span>

                        <p className="text-xl font-bold text-gradient">
                            {formatarMoeda(totalVenda)}
                        </p>
                    </div>
                </div>
            </Card>
        </form>
    );
};

export default VendasForm;
