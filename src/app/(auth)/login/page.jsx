"use client";

import { AntContext } from "@/contexts/AntContext";
import { useLogin } from "@/hooks/clientesHooks";
import { useRouter } from "next/navigation";
import { useContext, useRef } from "react";

const Login = () => {
  const { api } = useContext(AntContext);
  const formRef = useRef(null);
  const { mutateAsync: fazerLogin } = useLogin();
  const navigate = useRouter();

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

        document.cookie = `token=${resposta.token}; path=/; max-age=86400`;
        sessionStorage.setItem("token", resposta.token);
        sessionStorage.setItem("usuario", JSON.stringify(resposta.usuario));

        if(resposta.usuario.niveis.nome == "admin"){
          navigate.push("/admin");
        } else{
          navigate.push("/meus-pedidos");
        }
      },
      onError: (resposta) => {
        api[resposta.tipo]({
          description: resposta.mensagem,
        });
      },
    });
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <form className="w-[350px] border border-black/15 rounded-lg p-4">
        <h2 className="text-2xl text-center font-bold mb-6">
          Seja bem-vinda(o)
        </h2>
        <label className="block mb-1 text-xs font-bold">Email</label>
        <input
          className="w-full h-[40px] border border-black/15 pl-3 rounded mb-4"
          type="email"
          placeholder="email@email.com"
          onChange={(e) => {
            formRef.current = { ...formRef.current, email: e.target.value };
          }}
          required
        />
        <label className="block mb-1 text-xs font-bold">Senha</label>
        <input
          className="w-full h-[40px] border border-black/15 pl-3 rounded mb-4"
          type="password"
          placeholder="********"
          onChange={(e) => {
            formRef.current = { ...formRef.current, senha: e.target.value };
          }}
          required
        />
        <a className="block text-center underline mb-4" href="/mudar-senha">
          Esqueceu sua senha?
        </a>
        <button
          className="w-full h-[40px] bg-black text-white font-bold rounded mb-4"
          onClick={login}
        >
          Entrar
        </button>
        <p className="text-xs text-center">
          Não tem uma conta ainda?{" "}
          <a className="underline" href="/cadastro">
            Criar uma conta
          </a>{" "}
        </p>
      </form>
    </div>
  );
};

export default Login;
