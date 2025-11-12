"use client";
import { CarrinhoContext } from "@/contexts/CarrinhoContext";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { BiMinus, BiPlus, BiX } from "react-icons/bi";
import { toast } from "react-toastify";

const ItemCarrinho = ({
  id,
  produto_imagem,
  nome,
  valor,
  tamanho,
  cor,
  estoque,
  quantidade,
}) => {
  const [qtd, setQtd] = useState(quantidade);
  const { carrinho, setCarrinho } = useContext(CarrinhoContext);
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

  function remover() {
    setCarrinho([...carrinho.filter((produto) => produto.id != id)]);
  }
  useEffect(() => {
    setCarrinho([
      ...carrinho.map((produto) => {
        if (produto.id == id) {
          return { ...produto, quantidade : qtd };
        }
        return produto;
      }),
    ]);
  }, [qtd]);
  return (
    <div className="flex mb-4 gap-3">
      <Image width={70} height={70} src={produto_imagem[0].imagem} alt={nome} />
      <div className="flex-1">
        <div className="flex justify-between">
          <strong className="font-medium text-sm line-clamp-1">{nome}</strong>
          <BiX
            className="cursor-pointer hover:text-verde duration-200"
            onClick={remover}
          />
        </div>
        <h6 className="text-sm">R$ {valor.toFixed(2)}</h6>
        <div className="text-xs font-extralight">Cor: {cor}</div>
        <div className="text-xs font-extralight">Tamanho: {tamanho}</div>
        <div className="flex justify-end">
          <div className="flex border border-black/20 rounded py-1 px-2 items-center text-sm justify-center gap-3">
            <BiMinus className="cursor-pointer" onClick={decrementar} />
            <div className="text-center">{qtd}</div>
            <BiPlus
              className="cursor-pointer"
              onClick={() => incrementar(estoque)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemCarrinho;
