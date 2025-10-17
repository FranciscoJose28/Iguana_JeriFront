"use client"
import { toast } from 'react-toastify';
import Image from "next/image";
import { useContext, useState } from "react";
import { BiMinus, BiPlus, BiShoppingBag } from "react-icons/bi";
import { CarrinhoContext } from '../contexts/CarrinhoContext';


const Produto = ({id, nome, descricao, tamanho, cor, valor, estoque, id_categoria, desconto, categoria, produto_imagem}) => {
    const [quantidade, setQuantidade] = useState(1)
    const [manequim, setManequim] = useState("")
    const {carrinho, setCarrinho} = useContext(CarrinhoContext)

    function incrementar (){
        if (quantidade < estoque) {
            setQuantidade(quantidade + 1)        
        } else{
            toast("teste")
        }
    }

    function decrementar (){
        if (quantidade > 1) {
            setQuantidade(quantidade - 1)        
        }
    }

    function escolherTamanho (select){
        setManequim(select.target.value)
    }

    function adicionarCarrinho() {
        if (manequim) {
            let produto = {
                id,
                nome,
                valor,
                quantidade,
                produto_imagem
            }
            setCarrinho([...carrinho, produto])
            
        } else {
            toast("Selecione um tamanho!")
        }
    }

    return (
        <div>
            <div>
                <Image src={produto_imagem[0].imagem} alt={nome} className="rounded-lg h-[350px] object-cover"/>
                <h3 className="h-[48px] text-center uppercase mt-3 line-clamp-2">{nome}</h3>
                <h3 className="text-center text-2xl mt-3">R${Number(valor).toFixed(2)}</h3>
            </div>

            <div className="w-full bg-black/10 mb-2 mt-4">
                <select className="h-[40px] w-full px-2 cursor-pointer" defaultValue="" onChange={escolherTamanho}>
                    <option value="" disabled>Selecione</option>
                    <option value="PP">PP</option>
                    <option value="P">P</option>
                    <option value="M">M</option>
                    <option value="G">G</option>
                    <option value="GG">GG</option>
                </select>
            </div>

            <div className="flex gap-2">
                <div className="flex w-[100px] bg-black/10 items-center">
                    <span className="flex-1 text-center">{quantidade}</span>
                    <div>
                        <BiPlus className="cursor-pointer" onClick={incrementar}/>
                        <BiMinus className="cursor-pointer" onClick={decrementar}/>
                    </div>
                </div>
                <button className="selection:bg-transparent flex-1 bg-black text-white py-2 rounded gap-2 flex items-center justify-center hover:bg-verde duration-200 cursor-pointer" onClick={adicionarCarrinho}>
                   <BiShoppingBag/> Comprar
                </button>
            </div>
        </div>

    );
}
 
export default Produto;