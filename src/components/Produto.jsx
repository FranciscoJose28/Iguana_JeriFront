"use client"
import { toast } from 'react-toastify';
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { BiMinus, BiPlus, BiShoppingBag } from "react-icons/bi";
import { CarrinhoContext } from '@/contexts/CarrinhoContext';
import { useBuscarProduto } from '@/hooksprodutoHooks';


const Produto = ({ id, nome, descricao, tamanho, peso, cor, valor, estoque, id_categoria, desconto, categoria, produto_imagem }) => {
    const [quantidade, setQuantidade] = useState(1)
    const [manequim, setManequim] = useState("")
    const { mutateAsync: buscarProduto } = useBuscarProduto();
    const { carrinho, setCarrinho } = useContext(CarrinhoContext)
    const [imagemSelecionada, setImagemSelecionada] = useState(null);
    const [produto, setProduto] = useState(null);
    const [token, setToken] = useState(null);
    const [usuario, setUsuario] = useState(null);

    function incrementar() {
        if (quantidade < estoque) {
            setQuantidade(quantidade + 1)
        } else {
            toast("Este é todo o estoque disponível no momento")
        }
    }

    function decrementar() {
        if (quantidade > 1) {
            setQuantidade(quantidade - 1)
        }
    }

    function escolherTamanho(select) {
        setManequim(select.target.value)
    }

    function adicionarCarrinho() {
        if (manequim) {
            let p = {
                id,
                nome,
                valor: produto.valor,
                quantidade,
                produto_imagem,
                tamanho : manequim,
                peso,
                cor,
                estoque,
                desconto
            }
            setCarrinho([...carrinho, p])

        } else {
            toast("Selecione um tamanho!")
        }
    }

    useEffect(() => {
        sessionStorage.setItem("carrinho", JSON.stringify(carrinho))
    }, [carrinho])

    useEffect(() => {
        const t = sessionStorage.getItem("token");
        const u = JSON.parse(sessionStorage.getItem("usuario"));
        setToken(t)
        setUsuario(u)

        buscarProduto(id, {
            onSuccess: (resposta) => {
                setProduto(resposta)
                setImagemSelecionada(resposta?.produto_imagem[0]?.imagem)
            }
        })
    }, [])

    return (
        <div className="mb-10 group">
            <div className="mb-6">
                <div className="relative w-full h-40 lg:h-80">
                    <a href={`/produto/${id}`}>
                        <Image
                            src={produto_imagem[0].imagem}
                            alt={nome}
                            fill
                            priority={false}
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 300px"
                            className="rounded object-cover"
                        />
                    </a>
                </div>
                <h3 className="h-12 text-center uppercase mt-3 line-clamp-2 text-slate-800">{nome}</h3>
                <h3 className="text-center text-2xl mt-3 text-black font-bold">R${valor.toFixed(2)}</h3>
                <p className="text-sm text-gray-500 text-center">Em até <span className="font-bold text-black">3x</span> de <span className="font-bold text-black">R$ {(produto?.valor / 3).toFixed(2)}</span>  sem juros</p>
            </div>

            <div className="h-px bg-slate-300 group-hover:opacity-0 hidden lg:block"></div>

            <div className="flex gap-1 items-center lg:opacity-0 group-hover:opacity-100 duration-200">
                <div className=" bg-black/10 w-40 rounded-3xl hidden lg:block">
                    <select className="h-10 w-full px-2 cursor-pointer" value={manequim} onChange={escolherTamanho}>
                        <option value="" className="text-center" disabled>Tamanho</option>
                        {tamanho?.split(",").map((t) => t.trim()).filter(Boolean).map((t) => (
                            <option key={t} value={t}>
                                {t}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="flex gap-2">
                    <button className="selection:bg-transparent w-37 bg-verde text-white py-2 rounded-3xl gap-2 flex items-center justify-center hover:bg-verde/70 duration-200 cursor-pointer" onClick={adicionarCarrinho}>
                        <BiShoppingBag /> Comprar
                    </button>
                </div>

            </div>

            

        </div>

    );
}

export default Produto;