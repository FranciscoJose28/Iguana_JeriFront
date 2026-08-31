"use client";
import {
  BiChevronRight,
  BiEnvelope,
  BiHeart,
  BiSearch,
  BiShoppingBag,
  BiSolidHeart,
  BiSolidLogIn,
  BiSolidShoppingBag,
  BiSolidUserCircle,
} from "react-icons/bi";
import { AiOutlineUser } from "react-icons/ai";
import LogoMaior from "@/assets/LogoMaior.svg";
import Image from "next/image";
import { useContext, useEffect, useRef, useState } from "react";
import Carrinho from "./Carrinho";
import { CarrinhoContext } from "@/contexts/CarrinhoContext";
import { usePesquisarProduto } from "@/hooks/produtoHooks";
import { useRouter } from "next/navigation";
import { useLogin } from "@/hooks/clientesHooks";
import { AntContext } from "@/contexts/AntContext";
import { Tooltip } from "antd";

const Header = () => {
  const {
    carrinho,
    mostrarGaveta,
    setMostrarGaveta,
    mostrarLogin,
    setMostrarLogin,
  } = useContext(CarrinhoContext);
  const [produtos, setProdutos] = useState([]);
  const { mutateAsync: pesquisarProduto } = usePesquisarProduto();
  const router = useRouter();
  const [pesquisa, setPesquisa] = useState("");
  const [usuario, setUsuario] = useState(null);
  const formRef = useRef(null);
  const { mutateAsync: fazerLogin } = useLogin();
  const { api } = useContext(AntContext);
  const navigate = useRouter();
  const { urlProduto } = useContext(CarrinhoContext);
  const loginRef = useRef(null);
  const [mounted, setMounted] = useState(false);

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

  function login() {
    event.preventDefault();
    fazerLogin(formRef.current, {
      onSuccess: (resposta) => {
        if (!resposta.token) {
          api[resposta.tipo]({
            description: resposta.mensagem,
          });
          return;
        }

        sessionStorage.setItem("token", resposta.token);
        sessionStorage.setItem("usuario", JSON.stringify(resposta.usuario));

        document.cookie = `token=${resposta.token}; path=/`;

        if (
          resposta.usuario.niveis &&
          resposta.usuario.niveis.nome == "admin"
        ) {
          navigate.push("/admin");
        } else {
          if (urlProduto) {
            navigate.push(urlProduto);
          } else {
            navigate.push("/meu-perfil");
          }
        }
      },
    });
  }

  useEffect(() => {
    function handleClickOutside(event) {
      if (loginRef.current && !loginRef.current.contains(event.target)) {
        setMostrarLogin(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const u = sessionStorage.getItem("usuario");

    if (u) {
      setUsuario(JSON.parse(u));
    }

    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      <header className="items-center z-10 w-full bg-white border-b border-black/15 flex justify-between px-30 fixed top-0 left-0">
        <nav className="flex items-center gap-10">
        <div className="">
          <Image className="h-[50px]" src={LogoMaior} alt="Iguana Jeri" />
        </div>
          <ul className="flex gap-6 *:font-semibold *:text-slate-600">
            <li className="group relative after:w-full after:h-1 after:bg-transparent hover:after:bg-verde after:duration-200 after:bottom-0 after:left-0 after:absolute after:rounded-t-md">
              <a href="/" className="leading-[86.8px] block">
                Início
              </a>
            </li>
            <li className="group relative after:w-full after:h-1 after:bg-transparent hover:after:bg-verde after:duration-200 after:bottom-0 after:left-0 after:absolute after:rounded-t-md">
              <a href="/" className="leading-[86.8px] block">
                Biquínis
              </a>
              <div className="fixed left-0 top-[86px] bg-white w-full px-30 py-5 flex flex-col gap-2 invisible opacity-0 group-hover:visible group-hover:opacity-100 duration-200">
                <a href="">Sutiãs</a>
                <a href="">Calcinhas</a>
                <a href="">Conjuntos</a>
              </div>
            </li>
            <li className="group relative after:w-full after:h-1 after:bg-transparent hover:after:bg-verde after:duration-200 after:bottom-0 after:left-0 after:absolute after:rounded-t-md">
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
            <li className="group relative after:w-full after:h-1 after:bg-transparent hover:after:bg-verde after:duration-200 after:bottom-0 after:left-0 after:absolute after:rounded-t-md">
              <a href="/" className="leading-[86.8px] block">
                Maiôs
              </a>
            </li>
          </ul>
        </nav>

        <div className="flex gap-4 items-center">
          <div className="flex items-center relative">
            <input
              value={pesquisa}
              className="h-[30px] border-b focus:outline-0 focus:border-verde duration-200"
              placeholder="Pesquise aqui..."
              type="text"
              onChange={(e) => {
                pesquisar(e.target.value);
                setPesquisa(e.target.value);
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

          <div className="relative" ref={loginRef}>
            <Tooltip title="Meu perfil">
              {usuario ? (
                <div
                  onClick={() => setMostrarLogin(!mostrarLogin)}
                  className="hover:text-verde duration-200 cursor-pointer font-medium"
                >
                  {usuario.nome}
                </div>
              ) : (
                <AiOutlineUser
                  size={24}
                  onClick={() => setMostrarLogin(!mostrarLogin)}
                  className="hover:text-verde duration-200 cursor-pointer"
                />
              )}
            </Tooltip>

            <div
              className={`absolute top-full right-1/2 translate-x-8 mt-5 bg-white rounded-2xl shadow-2xl duration-200 border border-black/10 ${!mostrarLogin ? "opacity-0 invisible translate-y-2" : "opacity-100 visible translate-y-0"}`}
            >
              <div className="absolute -top-3 right-5 w-6 h-6 bg-white border-l border-t border-black/10 rotate-45"></div>

              {usuario ? (
                <div className="w-70 p-1">
                  <ul className="mt-5 bg-white rounded *:cursor-pointer">
                    <li>
                      <a
                        href="/meu-perfil"
                        className="flex items-center text-lg justify-between hover:text-verde duration-200 p-4 hover:bg-slate-100"
                      >
                        {" "}
                        <div className="flex items-center gap-3">
                          <BiSolidUserCircle /> Meus dados
                        </div>{" "}
                        <BiChevronRight />
                      </a>
                    </li>
                    <li>
                      <a
                        href="/meu-perfil/pedidos"
                        className="flex items-center text-lg justify-between hover:text-verde duration-200 p-4 hover:bg-slate-100"
                      >
                        <div className="flex items-center gap-3">
                          <BiSolidShoppingBag /> Meus pedidos
                        </div>{" "}
                        <BiChevronRight />
                      </a>
                    </li>
                    <li className="mb-2">
                      <a
                        href="/meu-perfil/favoritos"
                        className="flex items-center text-lg justify-between hover:text-verde duration-200 p-4 hover:bg-slate-100"
                      >
                        <div className="flex items-center gap-3">
                          <BiSolidHeart /> Favoritos
                        </div>{" "}
                        <BiChevronRight />
                      </a>
                    </li>
                    <li className="border-t border-slate-200 pt-2">
                      <a
                        onClick={() => {
                          sessionStorage.clear();
                          window.location.href = "/";
                        }}
                        className="flex items-center text-lg justify-between hover:text-verde duration-200 p-4 hover:bg-slate-100"
                      >
                        {" "}
                        <div className="flex items-center gap-3">
                          <BiSolidLogIn /> Sair
                        </div>{" "}
                        <BiChevronRight />
                      </a>
                    </li>
                  </ul>
                </div>
              ) : (
                <div className="w-100 p-5">
                  <h1 className="font-semibold text-verde text-xl mb-1">
                    Olá, visitante
                  </h1>

                  <p className="mb-2 text-slate-400">
                    Entrar com email e senha
                  </p>

                  <form className="border border-black/15 rounded-xl p-4 bg-white relative z-10">
                    <label className="block mb-1 text-xs text-slate-600 font-bold">
                      Email
                    </label>

                    <div className="relative w-full mb-4">
                      <BiEnvelope
                        size={20}
                        className="absolute left-3 top-2.5 text-gray-400 z-10"
                      />

                      <input
                        className="w-full h-10 border border-black/15 pl-10 rounded"
                        type="email"
                        placeholder="Email@email.com"
                        onChange={(e) => {
                          formRef.current = {
                            ...formRef.current,
                            email: e.target.value,
                          };
                        }}
                        required
                      />
                    </div>

                    <label className="block mb-1 text-xs text-slate-600 font-bold">
                      Senha
                    </label>

                    <input
                      className="w-full h-10 border border-black/15 pl-3 rounded mb-4"
                      type="password"
                      placeholder="********"
                      onChange={(e) => {
                        formRef.current = {
                          ...formRef.current,
                          senha: e.target.value,
                        };
                      }}
                      required
                    />

                    <a
                      className="block text-center text-sm text-slate-500 underline mb-4 hover:text-verde"
                      href="/mudar-senha"
                    >
                      Esqueceu sua senha?
                    </a>

                    <button
                      className="w-full h-10 bg-verde text-white font-bold rounded mb-4 cursor-pointer hover:bg-verde/60 duration-200"
                      onClick={login}
                    >
                      Entrar
                    </button>

                    <p className="text-xs text-center text-slate-600">
                      Não tem uma conta ainda?{" "}
                      <a
                        className="underline  hover:text-verde duration-200"
                        href="/cadastro"
                      >
                        Criar uma conta
                      </a>
                    </p>
                  </form>
                </div>
              )}
            </div>
          </div>

          <div className="relative">
            <Tooltip title="Sacola">
              <BiShoppingBag
                size={24}
                className="hover:text-verde duration-200 cursor-pointer"
                onClick={mostrarCarrinho}
              />
            </Tooltip>

            {carrinho.length > 0 && (
              <div className="absolute bottom-0 right-0 translate-x-1/2 leading-3.5 text-[10px] px-1 bg-verde rounded-2xl text-white">
                {carrinho.length}
              </div>
            )}
          </div>

          {usuario ? (
            <a href="/meu-perfil/favoritos">
              <Tooltip title="Wishlist">
                <BiHeart
                  size={24}
                  className="hover:text-verde duration-200 cursor-pointer"
                />
              </Tooltip>
            </a>
          ) : null}
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
