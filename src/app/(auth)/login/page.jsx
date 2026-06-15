"use client";

import { AntContext } from "@/contexts/AntContext";
import { CarrinhoContext } from "@/contexts/CarrinhoContext";
import { useLogin } from "@/hooks/clientesHooks";
import { useRouter } from "next/navigation";
import { useContext, useRef } from "react";

const Login = () => {
  const { api } = useContext(AntContext);
  const formRef = useRef(null);
  const { mutateAsync: fazerLogin } = useLogin();
  const navigate = useRouter();
  const { urlProduto } = useContext(CarrinhoContext);

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
      onError: (resposta) => {
        // api[resposta.tipo]({
        //   description: resposta.mensagem,
        // });
      },
    });
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <form className="w-[420px]">
        <h2 className="text-2xl text-center text-verde font-semibold mb-6">
          Seja bem-vinda(o)
        </h2>
        <label className="block mb-1 text-sm text-verde font-semibold">
          E-mail
        </label>
        <input
          className="w-full h-12 border border-black/15 pl-3 rounded mb-4"
          type="email"
          placeholder="Email@email.com"
          onChange={(e) => {
            formRef.current = { ...formRef.current, email: e.target.value };
          }}
          required
        />
        <label className="block mb-1 text-sm text-verde font-semibold">
          Senha
        </label>
        <input
          className="w-full h-10 border border-black/15 pl-3 rounded mb-2"
          type="password"
          placeholder="********"
          onChange={(e) => {
            formRef.current = { ...formRef.current, senha: e.target.value };
          }}
          required
        />
        <a
          className="block text-end text-xs text-slate-500 hover:text-verde underline mb-6"
          href="/mudar-senha"
        >
          Esqueceu sua senha?
        </a>
        <button
          className="w-full h-13 bg-verde text-white font-semibold rounded mb-4 cursor-pointer hover:bg-verde/85 duration-200"
          onClick={login}
        >
          Entrar
        </button>
        <p className="text-xs text-center text-slate-500">
          Não tem uma conta ainda?{" "}
          <a className="underline hover:text-verde" href="/cadastro">
            Criar uma conta
          </a>{" "}
        </p>
      </form>
    </div>
  );
};

export default Login;
