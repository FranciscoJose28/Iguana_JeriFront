"use client";
import { BiSearch, BiShoppingBag } from "react-icons/bi";
import { AiOutlineUser } from "react-icons/ai";
import LogoMenor from "@/assets/LogoMenor.png";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import Carrinho from "./Carrinho";
import { CarrinhoContext } from "@/contexts/CarrinhoContext";
import { usePesquisarProduto } from "@/hooks/produtoHooks";
import { useRouter } from "next/navigation";

const Header = () => {
  const { carrinho, mostrarGaveta, setMostrarGaveta } =
    useContext(CarrinhoContext);
  const [produtos, setProdutos] = useState([]);
  const { mutateAsync: pesquisarProduto } = usePesquisarProduto();
  const router = useRouter();
  const [pesquisa, setPesquisa] = useState("");

  function mostrarCarrinho() {
    setMostrarGaveta(true);
  }

  function pesquisar(palavra) {
    if (palavra.length > 4) {
      pesquisarProduto(palavra, {
        onSuccess: (resposta) => {
          setProdutos(resposta);
        },
      });
    }
  }

  useEffect(() => {
    if(pesquisa?.length == ""){
        setProdutos([])
    }
  },[pesquisa])

  return (
    <>
      <header className="items-center z-10 w-full bg-white border-b border-black/15 flex justify-between px-30 fixed top-0 left-0">
        <nav>
          <ul className="flex gap-6">
            <li className="group relative after:w-full after:h-1 after:bg-transparent hover:after:bg-black after:duration-200 after:bottom-0 after:left-0 after:absolute after:rounded-t-md">
              <a href="/" className="leading-[86.8px] block">
                Início
              </a>
            </li>
            <li className="group relative after:w-full after:h-1 after:bg-transparent hover:after:bg-black after:duration-200 after:bottom-0 after:left-0 after:absolute after:rounded-t-md">
              <a href="/" className="leading-[86.8px] block">
                Biquínis
              </a>
              <div className="fixed left-0 top-[86px] bg-white w-full px-30 py-5 flex flex-col gap-2 invisible opacity-0 group-hover:visible group-hover:opacity-100 duration-200">
                <a href="">Sutiãs</a>
                <a href="">Calcinhas</a>
                <a href="">Conjuntos</a>
              </div>
            </li>
            <li className="group relative after:w-full after:h-1 after:bg-transparent hover:after:bg-black after:duration-200 after:bottom-0 after:left-0 after:absolute after:rounded-t-md">
              <a href="/" className="leading-[86.8px] block">
                Roupas
              </a>
              <div className="fixed left-0 top-[86px] bg-white w-full px-30 py-5 flex flex-col gap-2 invisible opacity-0 group-hover:visible group-hover:opacity-100 duration-200">
                <a href="">Shorts</a>
                <a href="">Calças</a>
                <a href="">Chamise</a>
                <a href="">Macacão</a>
                <a href="">Blusa UV</a>
                <a href="">Saídas</a>
              </div>
            </li>
            <li className="group relative after:w-full after:h-1 after:bg-transparent hover:after:bg-black after:duration-200 after:bottom-0 after:left-0 after:absolute after:rounded-t-md">
              <a href="/" className="leading-[86.8px] block">
                Maiôs
              </a>
            </li>
          </ul>
        </nav>
        <div className="absolute top-1/2 left-1/2 -translate-1/2">
          <Image className="w-[50px]" src={LogoMenor} alt="Iguana Jeri" />
        </div>
        <div className="flex gap-4 items-center">
          <div className="flex items-center relative">
            <input
              value={pesquisa}
              className="h-[30px] border-b focus:outline-0 focus:border-verde duration-200"
              placeholder="Pesquisar"
              type="text"
              onChange={(e) => {
                pesquisar(e.target.value);
                setPesquisa(e.target.value)
              }}
            />
            <BiSearch
              size={22}
              className="hover:text-verde duration-200 cursor-pointer"
            />
            {produtos.length > 0 && (
              <div className="absolute w-[250px] bg-white top-full left-0 p-4">
                {produtos.map((produto) => (
                  <div
                    key={produto.id}
                    className="flex items-center gap-2"
                    onClick={() => router.push(`/produtos/${produto.id}`)}
                  >
                    <img
                      className="w-[50px] object-contain"
                      src={produto.produto_imagem[0].imagem}
                      alt=""
                    />
                    {produto.nome}
                  </div>
                ))}
              </div>
            )}
          </div>
          <a href="/login" className="hover:text-verde duration-200">
            <AiOutlineUser size={24} />
          </a>
          <div className="relative">
            <BiShoppingBag
              size={24}
              className="hover:text-verde duration-200 cursor-pointer"
              onClick={mostrarCarrinho}
            />
            {carrinho.length > 0 && (
              <div className="absolute top-0 right-0 translate-x-1/2 leading-[14px] text-[10px] px-[4px] bg-verde rounded-2xl text-white">
                {carrinho.length}
              </div>
            )}
          </div>
        </div>
      </header>
      <div
        className={`z-10 w-full h-screen bg-black/70 fixed top-0 left-0 cursor-pointer duration-200 ${
          mostrarGaveta ? "" : "opacity-0 invisible"
        }`}
        onClick={() => setMostrarGaveta(false)}
      ></div>
      <div
        className={`z-10 w-[400px] h-screen bg-white fixed top-0 right-0 duration-200 ${
          mostrarGaveta ? "" : "opacity-0 invisible"
        }`}
      >
        <Carrinho />
      </div>
    </>
  );
};

export default Header;
