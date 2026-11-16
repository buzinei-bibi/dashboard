import React from "react";
import Card from "../../components/layout/card/card";
import { Link, useNavigate, useParams } from "react-router-dom";
import Input from "../../components/ui/input";
import Label from "../../components/ui/label";
import Button from "../../components/ui/button";
import comprasService from "../../services/compras-service";
import fornecedoresService from "../../services/fornecedores-service";
import produtosService from "../../services/produtos-service";
import { toast } from "react-toastify";
import { HiPlus, HiTrash, HiShoppingBag } from "react-icons/hi";
import Loading from "../../components/loading";
import {
    FORMAS_PAGAMENTO,
    STATUS_VENDA,
    valorFormaPagamento,
    valorStatus,
} from "./compras-opcoes";

const ComprasForm = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const [loading, setLoading] = React.useState(true);

    const [fornecedores, setFornecedores] = React.useState([]);
    const [produtos, setProdutos] = React.useState([]);

    const [compra, setCompra] = React.useState({
        ID_COMPRA: "",
        DATA: new Date().toISOString().split("T")[0],
        FORMA_PGTO: FORMAS_PAGAMENTO[0].value,
        STATUS: STATUS_VENDA[0].value,
        FORNECEDOR: {
            ID_FORNECEDOR: "",
        },
        PRODUTOS: [],
    });

    // Carregar fornecedores, produtos e compra
    React.useEffect(() => {
        const carregarDados = async () => {
            try {
                const [fornecedoresResponse, produtosResponse] =
                    await Promise.all([
                        fornecedoresService.getAll(),
                        produtosService.getAll(),
                    ]);

                setFornecedores(fornecedoresResponse?.data || []);
                setProdutos(produtosResponse?.data || []);

                // Se for edição, carregar compra
                if (id) {
                    const response = await comprasService.getById(id);
                    // 204 = registro não encontrado (a API devolve vazio)
                    if (!response?.data?.length) {
                        toast.error("compra não encontrada.");
                        navigate("/compras");
                        return;
                    }

                    const dados = response.data[0];

                    setCompra({
                        ID_COMPRA: dados.ID_COMPRA,
                        DATA: dados.DATA.split("/").reverse().join("-"),
                        FORMA_PGTO: valorFormaPagamento(dados.FORMA_PGTO),
                        STATUS: valorStatus(dados.STATUS),
                        FORNECEDOR: {
                            ID_FORNECEDOR: dados.FORNECEDOR.ID_FORNECEDOR,
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

    // Atualizar dados da compra
    const handleChange = (campo, valor) => {
        setCompra((prev) => ({
            ...prev,
            [campo]: valor,
        }));
    };

    // Adicionar produto
    const adicionarProduto = () => {
        setCompra((prev) => ({
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

    // Selecionar produto (o preço começa com o valor do cadastro, mas pode ser alterado)
    const selecionarProduto = (index, idProduto) => {
        const produtoSelecionado = produtos.find(
            (produto) =>
                String(produto.ID_PRODUTO) === String(idProduto)
        );

        if (!produtoSelecionado) return;

        const novosProdutos = [...compra.PRODUTOS];

        novosProdutos[index] = {
            ID_PRODUTO: produtoSelecionado.ID_PRODUTO,
            PRODUTO: produtoSelecionado.PRODUTO,
            PRECO_UNIT: Number(produtoSelecionado.PRECO_UNIT || 0),
            QTDE: 1,
        };

        setCompra((prev) => ({
            ...prev,
            PRODUTOS: novosProdutos,
        }));
    };

    // Alterar um campo do produto (PRECO_UNIT ou QTDE)
    const alterarProduto = (index, campo, valor) => {
        const novosProdutos = [...compra.PRODUTOS];

        novosProdutos[index] = {
            ...novosProdutos[index],
            [campo]: valor,
        };

        setCompra((prev) => ({
            ...prev,
            PRODUTOS: novosProdutos,
        }));
    };

    // Remover produto
    const removerProduto = (index) => {
        setCompra((prev) => ({
            ...prev,
            PRODUTOS: prev.PRODUTOS.filter(
                (_, i) => i !== index
            ),
        }));
    };

    // Calcular total
    const totalCompra = compra.PRODUTOS.reduce(
        (total, produto) =>
            total +
            Number(produto.PRECO_UNIT || 0) *
            Number(produto.QTDE || 0),
        0
    );

    // Salvar compra
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!compra.FORNECEDOR.ID_FORNECEDOR) {
            toast.error("selecione um fornecedor.");
            return;
        }

        if (compra.PRODUTOS.length === 0) {
            toast.error("adicione pelo menos um produto.");
            return;
        }

        if (
            compra.PRODUTOS.some(
                (produto) =>
                    !produto.ID_PRODUTO ||
                    Number(produto.QTDE) <= 0 ||
                    Number(produto.PRECO_UNIT) <= 0
            )
        ) {
            toast.error("verifique os produtos, preços e quantidades.");
            return;
        }

        setLoading(true);

        try {
            const dadosCompra = {
                ...compra,
                DATA: compra.DATA.split("-").reverse().join("/"),
                FORNECEDOR: {
                    ID_FORNECEDOR: Number(compra.FORNECEDOR.ID_FORNECEDOR),
                },
                PRODUTOS: compra.PRODUTOS.map((produto) => ({
                    ID_PRODUTO: Number(produto.ID_PRODUTO),
                    PRECO_UNIT: Number(produto.PRECO_UNIT),
                    QTDE: Number(produto.QTDE),
                })),
            };

            let response;

            if (id) {
                response = await comprasService.update(id, dadosCompra);
            } else {
                response = await comprasService.create(dadosCompra);
            }

            toast.success(response.message);
            navigate("/compras");
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
            {/* Informações da compra */}
            <Card title="informações da compra">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
                    {/* Data */}
                    <div>
                        <Label htmlFor="data" required>
                            Data da Compra
                        </Label>

                        <Input
                            type="date"
                            id="data"
                            required
                            value={compra.DATA}
                            onChange={(e) =>
                                handleChange("DATA", e.target.value)
                            }
                        />
                    </div>

                    {/* Fornecedor */}
                    <div>
                        <Label htmlFor="fornecedor" required>
                            Fornecedor
                        </Label>

                        <select
                            id="fornecedor"
                            required
                            value={compra.FORNECEDOR.ID_FORNECEDOR}
                            onChange={(e) =>
                                handleChange("FORNECEDOR", {
                                    ID_FORNECEDOR: e.target.value,
                                })
                            }
                            className={selectClass}
                        >
                            <option value="">Selecione um fornecedor</option>

                            {fornecedores.map((fornecedor) => (
                                <option
                                    key={fornecedor.ID_FORNECEDOR}
                                    value={fornecedor.ID_FORNECEDOR}
                                >
                                    {fornecedor.NOME_FANTASIA || fornecedor.RAZAO_SOCIAL} - {fornecedor.CNPJ}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* forma de pagamento */}
                    <div>
                        <Label htmlFor="forma_pgto" required>
                            forma de Pagamento
                        </Label>

                        <select
                            id="forma_pgto"
                            required
                            value={compra.FORMA_PGTO}
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

                    {/* status */}
                    <div>
                        <Label htmlFor="status" required>
                            status
                        </Label>

                        <select
                            id="status"
                            required
                            value={compra.STATUS}
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

            {/* produtos da compra */}
            <Card
                title="produtos da compra"
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
                    {compra.PRODUTOS.length > 0 && (
                        <div className="hidden @xl:grid grid-cols-12 gap-2 px-2.5 pb-1 text-xs font-medium text-slate-500 dark:text-purple-200/60">
                            <span className="col-span-4">produto</span>
                            <span className="col-span-3">preço de custo</span>
                            <span className="col-span-2">quantidade</span>
                            <span className="col-span-2 text-right">subtotal</span>
                            <span className="col-span-1" />
                        </div>
                    )}

                    <div className="space-y-1.5">
                        {compra.PRODUTOS.map((produto, index) => (
                            <div
                                key={index}
                                className="grid grid-cols-[1fr_4.5rem_1fr_auto] @xl:grid-cols-12 gap-2 items-center px-2.5 py-2 border border-purple-100 dark:border-white/10 rounded-xl"
                            >
                                {/* Produto */}
                                <div className="col-span-4 @xl:col-span-4">
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

                                {/* Preço unitário (preço pago ao fornecedor) */}
                                <div className="@xl:col-span-3">
                                    <Input
                                        type="number"
                                        min="0.01"
                                        step="0.01"
                                        required
                                        aria-label="Preço de custo"
                                        value={produto.PRECO_UNIT}
                                        onChange={(e) =>
                                            alterarProduto(index, "PRECO_UNIT", e.target.value)
                                        }
                                        className="py-1.5! mt-0!"
                                    />
                                </div>

                                {/* Quantidade */}
                                <div className="@xl:col-span-2">
                                    <Input
                                        type="number"
                                        min="1"
                                        required
                                        aria-label="Quantidade"
                                        value={produto.QTDE}
                                        onChange={(e) =>
                                            alterarProduto(index, "QTDE", e.target.value)
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

                {compra.PRODUTOS.length === 0 && (
                    <div className="flex items-center justify-center gap-2 py-4 rounded-xl border border-dashed border-purple-200 dark:border-white/10 text-slate-500 dark:text-purple-200/60">
                        <HiShoppingBag className="w-5 h-5 opacity-60" />
                        <p className="text-sm">nenhum produto adicionado.</p>
                    </div>
                )}

                {/* Botões + total */}
                <div className="mt-4 pt-3 border-t border-purple-100 dark:border-white/10 flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div className="flex gap-2">
                        <Link to="/compras">
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
                            Total da Compra
                        </span>

                        <p className="text-xl font-bold text-gradient">
                            {formatarMoeda(totalCompra)}
                        </p>
                    </div>
                </div>
            </Card>
        </form>
    );
};

export default ComprasForm;
