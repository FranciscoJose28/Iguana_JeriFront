import { BiX } from "react-icons/bi";
import { CarrinhoContext } from "../contexts/CarrinhoContext";
import { useContext } from "react";
import Image from "next/image";

const Carrinho = () => {
    const {carrinho} = useContext(CarrinhoContext)
    return (
        <div className="p-4">
            <div className="flex items-center gap-4 mb-4">
                <BiX className="text-[25px] pt-1"/>
                <h2 className="text-2xl">Seu carrinho</h2>
            </div>
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
    );
}
 
export default Carrinho;