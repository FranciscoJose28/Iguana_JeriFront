import { BiMinus, BiPlus, BiX } from "react-icons/bi";
import { CarrinhoContext } from "@/contexts/CarrinhoContext";
import { useContext, useState } from "react";
import Image from "next/image";
import { AiOutlineHeart } from "react-icons/ai";
import { toast } from "react-toastify";
import ItemCarrinho from "@/components/ItemCarrinho";

const Carrinho = () => {
  const { carrinho, setMostrarGaveta } = useContext(CarrinhoContext);
  console.log(carrinho);
  

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex items-center justify-between border-b border-black/20 px-2 py-6">
        <div className="flex items-center gap-2">
          <BiX className="text-[28px] text-black/40 cursor-pointer" onClick={() => setMostrarGaveta(false)}/>
          <h2 className="text-lg font-light text-black/40">SUA SACOLA</h2>
        </div>
        <span className="flex gap-2 items-center text-sm text-black/40 underline hover:text-verde duration-200 cursor-pointer">
          Meus favoritos <AiOutlineHeart className="text-xl" />
        </span>
      </div>

      {carrinho.length == 0 ? (
        <div className="flex-1 flex items-center justify-center text-center">
          <div className="flex flex-col items-center">
            <h3 className="text-xl text-black/70 font-light mb-2">
              Sua sacola está vazia
            </h3>

            <p className="text-black/70 mb-6">
              Explore o site para conhecer nossos <br /> lançamentos.
            </p>

            <button className="border border-verde text-verde px-2 py-2 rounded-md hover:bg-verde hover:text-white duration-200 cursor-pointer">
              Descubra a coleção completa →
            </button>
          </div>
        </div>
      ) : (
        <div className="p-4 flex flex-col h-[calc(100vh_-_77px)]">
          <div className="flex-1 overflow-auto">
            {carrinho.map((produto) => (
              <ItemCarrinho {...produto} key={produto.id}/>
            ))}
          </div>

          <div>
            <div className="flex justify-between items-center">
              <h6>Subtotal</h6>
              R$ {carrinho.reduce((total, produto) => total + (produto.valor * produto.quantidade), 0).toFixed(2)}
            </div>
            <div className="flex justify-between items-center">
              <h6>Total</h6>
              R$ {carrinho.reduce((total, produto) => total + ((produto.valor - produto.desconto) * produto.quantidade), 0).toFixed(2)}
            </div>
          </div>

          <a href="/finalizar-compra">
            <button className="selection:bg-transparent w-full flex-1 bg-black text-white py-2 rounded gap-2 flex items-center justify-center hover:bg-verde duration-200 cursor-pointer">
              Finalizar compra
            </button>
          </a>

          <div className="flex gap-2 items-center justify-center text-medium font-semibold text-black/80 underline mt-5 cursor-pointer" onClick={() => setMostrarGaveta(false)}>
            Continuar Explorando
          </div>
        </div>
      )}
    </div>
  );
};

export default Carrinho;
