"use client"
import { useEffect, useState } from "react";
import { useBuscarProdutos } from "../hooks/produtoHooks";
import Produto from "./Produto";

const Produtos = () => {

  const {data: Lista, isFetched} = useBuscarProdutos()
  
  // const [Lista, setLista] = useState([])
  // async function buscarProdutos() {
  //   const request = await fetch("http://localhost:8000/produtos")
  //   const response = await request.json()
  //   if(response){
  //     setLista(response)
  //   }
  // }
  // console.log(Lista);
  
  // useEffect(() => {
  //   buscarProdutos()
  // }, [])

  return (
    <>
      <h2 className="text-center text-2xl font-semibold mt-10">Novidades!</h2>
      <div className="grid grid-cols-4 gap-4 px-15 py-10">
        {isFetched && Lista.map((produto) => (
          <Produto key={produto.id} {...produto} />
        ))}
      </div>
    </>
  );
};

export default Produtos;
