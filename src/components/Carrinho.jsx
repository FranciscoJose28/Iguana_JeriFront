import { BiX } from "react-icons/bi";
import { CarrinhoContext } from "../contexts/CarrinhoContext";
import { useContext } from "react";
import Image from "next/image";
import { AiOutlineHeart } from "react-icons/ai";

const Carrinho = () => {
    const {carrinho} = useContext(CarrinhoContext)
    return (
        <div className="w-full h-full flex flex-col">
            <div className="flex items-center justify-between border-b border-black/20 px-2 py-6"> 
                <div className="flex items-center gap-2">
                    <BiX className="text-[28px] text-black/40 cursor-pointer"/>
                    <h2 className="text-lg font-light text-black/40">SUA SACOLA</h2>
                </div>
                <span className="flex gap-2 items-center text-sm text-black/40 underline hover:text-verde duration-200 cursor-pointer">
                    Meus favoritos <AiOutlineHeart className="text-xl"/>
                </span>
            </div>

            {
                carrinho.length == 0 ? (
                    <div className="flex-1 flex items-center justify-center text-center">
                        <div className="flex flex-col items-center">    
                            <h3 className="text-xl text-black/70 font-light mb-2">Sua sacola está vazia</h3>

                            <p className="text-black/70 mb-6">Explore o site para conhecer nossos <br /> lançamentos.</p>

                            <button className="border border-verde text-verde px-2 py-2 rounded-md hover:bg-verde hover:text-white duration-200 cursor-pointer">
                                Descubra a coleção completa →
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="p-4">
                        {
                            carrinho.map(produto => (
                                <div className="flex">
                                    <Image src={produto.produto_imagem} alt={produto.nome}/>
                                    <div>
                                        {produto.nome}
                                        <h6>R$ {produto.valor.toFixed(2)}</h6>
                                    </div>
                                </div>
                            ))             
                        }
                    </div>
                )
            }
        </div>
    );
}
 
export default Carrinho;