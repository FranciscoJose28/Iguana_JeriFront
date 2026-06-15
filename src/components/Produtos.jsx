"use client"

import { useBuscarProdutos } from "@/hooks/produtoHooks";
import Produto from "./Produto";

const Produtos = () => {

  const {data: Lista, isFetched} = useBuscarProdutos()

  return (
    <>
      <h2 className="text-center text-2xl font-semibold mt-10">Novidades!</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-6 sm:px-30 py-10">
        {isFetched && Lista.map((produto) => (
          <Produto key={produto.id} {...produto} />
        ))}
      </div>
    </>
  );
};

export default Produtos;
