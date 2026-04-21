"use client"
import Image from "next/image";
import produto1 from "@/assets/produto1.jpg"
import { use, useContext, useEffect, useState } from "react";
import { useBuscarProduto } from "@/hooks/produtoHooks";
import { toast, ToastContainer } from "react-toastify";
import { CarrinhoContext } from "@/contexts/CarrinhoContext";
import { LuChevronRight } from "react-icons/lu";
import { BiMinus, BiPlus } from "react-icons/bi";

const ProdutoDetalhe = ({ params }) => {
    const { id } = use(params)
    const { mutateAsync: buscarProduto } = useBuscarProduto()
    const [produto, setProduto] = useState(null)
    const [manequim, setManequim] = useState("")
    const { carrinho, setCarrinho } = useContext(CarrinhoContext)
    const [qtd, setQtd] = useState(1)
    const [imagemSelecionada, setImagemSelecionada] = useState(null);

    function incrementar(estoque) {
        if (qtd < estoque) {
            setQtd(qtd + 1);
        } else {
            toast("Este é todo o estoque disponível no momento");
        }
    }

    function decrementar() {
        if (qtd > 1) {
            setQtd(qtd - 1);
        }
    }

    function adicionarCarrinho() {
        if (manequim) {
            let p = {
                id: produto.id,
                nome: produto.nome,
                valor: produto.valor,
                quantidade: qtd,
                produto_imagem: produto.produto_imagem,
                tamanho: manequim,
                cor: produto.cor,
                estoque: produto.estoque,
                desconto: produto.desconto
            }
            setCarrinho([...carrinho, p])

        } else {
            toast("Selecione um tamanho!")
        }
    }

    console.log(produto);

    useEffect(() => {
        buscarProduto(id, {
            onSuccess: (resposta) => {
                setProduto(resposta)
                setImagemSelecionada(resposta?.produto_imagem[0]?.imagem)
            }
        })
    }, [])

    return (
        <div>
            <div className="flex items-center gap-1 uppercase pt-35 px-30 text-xs text-slate-500 font-bold">
                <a href="/" className="hover:text-verde cursor-pointer text-slate-400 duration-200">Início</a>
                <LuChevronRight className="text-slate-400" />
                <a href={`/categoria/${produto?.categoria.nome}`} className="hover:text-verde cursor-pointer text-slate-400 duration-200">{produto?.categoria.nome}</a>
                <LuChevronRight className="text-slate-400" />
                <h6>{produto?.nome}</h6>
            </div>

            <div className="flex justify-center py-5 gap-15">
                <div>
                    <img
                        className="rounded-xl object-cover w-[600px] h-[600px]"
                        src={imagemSelecionada}
                        alt="foto do produto"
                    />

                    <div className="flex gap-4 mt-4 justify-center">
                        {produto?.produto_imagem.map((img) => (
                            <img
                                key={img.id}
                                src={img.imagem}
                                className="w-30 rounded cursor-pointer hover:opacity-70"
                                onClick={() => setImagemSelecionada(img.imagem)}
                            />
                        ))}
                    </div>
                </div>

                <div className="flex flex-col items-start gap-6 w-[550px]">
                    <div>
                        <h2 className="text-xl font-semibold">{produto?.nome}</h2>
                        <p className="text-gray-400 text-sm mb-2">Referência do produto</p>
                        <p className="whitespace-pre-line leading-5">{produto?.descricao}</p>
                        <div className="items-center gap-2">
                            <p className="text-black mt-4 text-xl font-bold">R$ {produto?.valor.toFixed(2)}</p>
                            <p className="text-sm text-gray-500">Em até 2x de R$ {(produto?.valor / 2).toFixed(2)} sem juros</p>
                        </div>
                    </div>

                    {
                        produto?.cor.split(",").length > 1 && (
                            <div>
                                <h3 className="font-semibold">Cores:</h3>
                                <div className="flex gap-3 mt-2">
                                    <span className={`border px-3 py-1 rounded cursor-pointer hover:border-verde duration-200 ${manequim == "P" && "border-verde"}`} onClick={() => setManequim("P")}>P</span>
                                    <span className={`border px-3 py-1 rounded cursor-pointer hover:border-verde duration-200 ${manequim == "M" && "border-verde"}`} onClick={() => setManequim("M")}>M</span>
                                    <span className={`border px-3 py-1 rounded cursor-pointer hover:border-verde duration-200 ${manequim == "G" && "border-verde"}`} onClick={() => setManequim("G")}>G</span>
                                </div>
                            </div>
                        )
                    }

                    <div>
                        <h3 className="font-semibold">Tamanhos:</h3>
                        <div className="flex gap-3 mt-2">
                            <span className={`border px-3 py-1 rounded cursor-pointer hover:border-verde duration-200 ${manequim == "P" && "border-verde"}`} onClick={() => setManequim("P")}>P</span>
                            <span className={`border px-3 py-1 rounded cursor-pointer hover:border-verde duration-200 ${manequim == "M" && "border-verde"}`} onClick={() => setManequim("M")}>M</span>
                            <span className={`border px-3 py-1 rounded cursor-pointer hover:border-verde duration-200 ${manequim == "G" && "border-verde"}`} onClick={() => setManequim("G")}>G</span>
                        </div>
                    </div>

                    <div className="flex gap-4 items-center">
                        <div className="flex">
                            <div className="flex border border-black/20 rounded py-3 px-6 items-center text-sm justify-center gap-3">
                                <BiMinus className="cursor-pointer text-lg hover:text-verde duration-200" onClick={decrementar} />
                                <div className="text-center">{qtd}</div>
                                <BiPlus
                                    className="cursor-pointer text-lg hover:text-verde duration-200"
                                    onClick={() => incrementar(produto?.estoque)}
                                />
                            </div>
                        </div>
                        <button className="bg-black text-white py-3 px-6 rounded hover:bg-verde duration-200 cursor-pointer" onClick={adicionarCarrinho}>
                            Adicionar ao carrinho
                        </button>
                    </div>

                    <p className="text-xs text-slate-500">* Aqui sua compra é 100% segura, compre com tranquilidade.</p>
                </div>
            </div>

            <ToastContainer />
        </div>
    );
}

export default ProdutoDetalhe;