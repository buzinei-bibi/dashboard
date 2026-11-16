import React from "react";
import { Link } from "react-router-dom";
import { HiArrowRight, HiOutlineLightBulb, HiPlus } from "react-icons/hi";
import HeartBackground from "./heart-background";
import clientesService from "../../services/clientes-service";
import fornecedoresService from "../../services/fornecedores-service";
import produtosService from "../../services/produtos-service";
import vendasService from "../../services/vendas-service";
import comprasService from "../../services/compras-service";

const formatarMoeda = (valor) =>
    Number(valor || 0).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

const formatarNumero = (valor) => Number(valor || 0).toLocaleString("pt-BR");

// Soma PRECO_UNIT * QTDE de todos os produtos de várias vendas/compras
const somarTotal = (registros) =>
    registros.reduce(
        (total, registro) =>
            total +
            (registro.PRODUTOS || []).reduce(
                (soma, produto) => soma + Number(produto.PRECO_UNIT || 0) * Number(produto.QTDE || 0),
                0
            ),
        0
    );

// A API devolve null quando a lista está vazia (204)
const lista = (resultado) =>
    resultado.status === "fulfilled" ? resultado.value?.data || [] : null;

const Home = () => {
    const [dados, setDados] = React.useState(null);

    React.useEffect(() => {
        const carregar = async () => {
            const resultados = await Promise.allSettled([
                clientesService.getAll(),
                fornecedoresService.getAll(),
                produtosService.getAll(),
                vendasService.getAll(),
                comprasService.getAll(),
            ]);

            const [clientes, fornecedores, produtos, vendas, compras] = resultados.map(lista);

            setDados({
                online: resultados.some((r) => r.status === "fulfilled"),
                clientes,
                fornecedores,
                produtos,
                vendas,
                compras,
            });
        };

        carregar();
    }, []);

    const carregando = dados === null;

    // Linhas do "terminal". Cada uma aparece um pouco depois da anterior.
    const linhas = carregando
        ? [
            { tipo: "comando", texto: "he4rt --init" },
            { tipo: "info", texto: "conectando api do banco de dados..." },
        ]
        : [
            { tipo: "comando", texto: "he4rt --init" },
            { tipo: "info", texto: "conectando api do banco de dados..." },
            dados.online
                ? { tipo: "ok", texto: "✓ conexão estabelecida!" }
                : { tipo: "erro", texto: "✗ não foi possível conectar à api" },
            { tipo: "comando", texto: "he4rt stats --loja" },
            { tipo: "titulo", texto: "He4rt Store — resumo" },
            { tipo: "stat", icone: "👥", rotulo: "clientes", valor: dados.clientes },
            { tipo: "stat", icone: "🚚", rotulo: "fornecedores", valor: dados.fornecedores },
            { tipo: "stat", icone: "📦", rotulo: "produtos", valor: dados.produtos },
            { tipo: "stat", icone: "🛒", rotulo: "vendas", valor: dados.vendas, total: dados.vendas && somarTotal(dados.vendas) },
            { tipo: "stat", icone: "🛍️", rotulo: "compras", valor: dados.compras, total: dados.compras && somarTotal(dados.compras) },
            { tipo: "dica", texto: "bom trabalho hoje 💜" },
        ];

    return (
        <section className="relative isolate min-h-full flex items-center overflow-hidden -m-6 md:-m-8 p-6 md:p-10">
            {/* coração de fundo */}
            <HeartBackground className="absolute -z-10 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[640px] md:w-[920px] max-w-none" />
            {/* brilho roxo atrás do coração */}
            <div className="pointer-events-none absolute -z-20 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-purple-600/20 dark:bg-purple-700/20 blur-3xl" />

            <div className="w-full grid grid-cols-1 xl:grid-cols-[1fr_minmax(0,30rem)] gap-10 items-center">
                {/* Texto principal */}
                <div className="max-w-xl">
                    <span className="inline-flex items-center gap-2 rounded-full border border-purple-300/60 dark:border-white/10 bg-surface px-3 py-1 text-[11px] font-semibold tracking-[0.18em] text-purple-700 dark:text-purple-200">
                        <span className="h-1.5 w-1.5 rounded-full bg-fuchsia-500 animate-pulse" />
                        painel administrativo
                    </span>

                    <h2 className="mt-5 text-4xl md:text-5xl font-extrabold leading-[1.05] tracking-tight">
                        Gerencie sua loja <br />
                        <span className="text-gradient">com o coração</span>
                    </h2>

                    <p className="mt-5 text-sm md:text-base text-slate-600 dark:text-purple-100/70 max-w-md">
                        clientes, fornecedores, produtos, vendas e compras em um só lugar.
                        escolha um atalho abaixo ou use o menu ao lado.
                    </p>

                    <div className="mt-8 flex flex-wrap gap-3">
                        <Link to="/vendas/novo" className="btn-primary inline-flex items-center gap-2 px-5 py-3 text-sm">
                            <HiPlus /> nova venda
                        </Link>
                        <Link
                            to="/compras/novo"
                            className="inline-flex items-center gap-2 rounded-[0.625rem] px-5 py-3 text-sm font-semibold border border-purple-300 dark:border-white/15 text-purple-700 dark:text-purple-100 bg-surface hover:bg-purple-200/40 dark:hover:bg-white/10"
                        >
                            <HiPlus /> nova compra
                        </Link>
                    </div>
                </div>

                {/* Terminal + card "novo por aqui" */}
                <div className="flex flex-col gap-4 w-full">
                    <div className="rounded-2xl border border-white/10 bg-[#120a1f]/95 shadow-[0_30px_60px_-25px_rgba(91,33,182,0.6)] backdrop-blur-xl overflow-hidden normal-case">
                        <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10">
                            <span className="h-3 w-3 rounded-full bg-red-500" />
                            <span className="h-3 w-3 rounded-full bg-yellow-500" />
                            <span className="h-3 w-3 rounded-full bg-green-500" />
                            <span className="ml-3 text-xs text-white/40 font-mono">admin@he4rt ~</span>
                        </div>

                        <div className="px-5 py-4 font-mono text-[13px] leading-relaxed text-white/80 min-h-[19rem]">
                            {linhas.map((linha, i) => (
                                <p
                                    key={`${linha.tipo}-${i}`}
                                    className={`terminal-linha ${linha.tipo === "comando" && i > 0 ? "mt-3" : ""}`}
                                    style={{ animationDelay: `${i * 120}ms` }}
                                >
                                    {linha.tipo === "comando" && (
                                        <>
                                            <span className="text-fuchsia-400">$ </span>
                                            <span className="text-white">{linha.texto}</span>
                                        </>
                                    )}
                                    {linha.tipo === "info" && <span className="text-white/60">{linha.texto}</span>}
                                    {linha.tipo === "ok" && <span className="text-emerald-400">{linha.texto}</span>}
                                    {linha.tipo === "erro" && <span className="text-red-400">{linha.texto}</span>}
                                    {linha.tipo === "titulo" && <span className="text-purple-300">{linha.texto}</span>}
                                    {linha.tipo === "dica" && <span className="block mt-3 text-emerald-400">{linha.texto}</span>}
                                    {linha.tipo === "stat" && (
                                        <span className="text-cyan-300">
                                            {linha.icone} {linha.rotulo}:{" "}
                                            <span className="text-white font-semibold">
                                                {linha.valor === null ? "—" : formatarNumero(linha.valor.length)}
                                            </span>
                                            {linha.total ? (
                                                <span className="text-white/50"> ({formatarMoeda(linha.total)})</span>
                                            ) : null}
                                        </span>
                                    )}
                                </p>
                            ))}
                            <span className="terminal-cursor inline-block h-4 w-2 translate-y-0.5 bg-fuchsia-400" />
                        </div>
                    </div>

                    <Link
                        to="/produtos"
                        className="group flex items-center gap-4 rounded-2xl border border-purple-200/70 dark:border-white/10 border-l-4 border-l-purple-600 dark:border-l-fuchsia-500 bg-surface backdrop-blur-xl px-5 py-4 shadow-[0_20px_50px_-24px_rgba(91,33,182,0.35)]"
                    >
                        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-purple-600/10 dark:bg-white/5 text-purple-700 dark:text-purple-200 text-xl">
                            <HiOutlineLightBulb />
                        </span>
                        <span className="flex-1">
                            <span className="block font-semibold text-sm">novo por aqui?</span>
                            <span className="block text-xs text-slate-500 dark:text-purple-200/60">
                                comece cadastrando seus produtos e depois registre vendas e compras.
                            </span>
                        </span>
                        <HiArrowRight className="text-slate-400 dark:text-purple-200/50 transition-transform group-hover:translate-x-1" />
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Home;
