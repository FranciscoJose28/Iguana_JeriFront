"use client";

import { AntContext } from "@/contexts/AntContext";
import { CarrinhoContext } from "@/contexts/CarrinhoContext";
import { useCriarCliente, useLogin } from "@/hooks/clientesHooks";
import { useRouter } from "next/navigation";
import { useContext, useRef } from "react";

const Cadastro = () => {
  const { api } = useContext(AntContext);
  const formRef = useRef(null);
  const navigate = useRouter();
  const { mutate: cadastrarCliente } = useCriarCliente();
  const { mutateAsync: fazerLogin } = useLogin();
  const { urlProduto } = useContext(CarrinhoContext);

  function cadastrar() {
    event.preventDefault();
    const { senha, senha2, email } = formRef.current;
    if (senha != senha2) {
      api.warning({
        description: "As senhas precisam ser iguais!",
      });
      return;
    }
    delete formRef.current.senha2;
    cadastrarCliente(formRef.current, {
      onSuccess: (resposta) => {
        if (resposta.tipo == "warning") {
            api[resposta.tipo]({
                description: resposta.mensagem,
              });
              return;
        }
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
          onError: (error) => {
            api[error.response.data.tipo]({
              description: error.response.data.mensagem,
            });
          },
        });
      },

      onError: (error) => {
            api[error.response.data.tipo]({
              description: error.response.data.mensagem,
            });
          },
    });
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <form className="w-[430px] rounded-lg p-4 mt-10">
        <h2 className="text-2xl text-center font-semibold mb-6 text-verde">
          Cadastre-se
        </h2>

        <label className="block mb-1 text-xs font-bold text-slate-700">
          Nome Completo
        </label>
        <input
          className="w-full h-10 border border-black/15 pl-3 rounded mb-4"
          type="text"
          placeholder="Digite seu nome"
          onChange={(e) => {
            formRef.current = { ...formRef.current, nome: e.target.value };
          }}
          required
        />

        <label className="block mb-1 text-xs font-bold text-slate-700">
          Telefone (opcional)
        </label>
        <input
          className="w-full h-10 border border-black/15 pl-3 rounded mb-4"
          type="tel"
          placeholder="Digite seu telefone"
          onChange={(e) => {
            formRef.current = { ...formRef.current, telefone: e.target.value };
          }}
        />

        <label className="block mb-1 text-xs font-bold text-slate-700">
          Email
        </label>
        <input
          className="w-full h-10 border border-black/15 pl-3 rounded mb-4"
          type="email"
          placeholder="Email@email.com"
          onChange={(e) => {
            formRef.current = { ...formRef.current, email: e.target.value };
          }}
          required
        />

        <label className="block mb-1 text-xs font-bold text-slate-700">
          Senha
        </label>
        <input
          className="w-full h-10 border border-black/15 pl-3 rounded mb-4"
          type="password"
          placeholder="********"
          onChange={(e) => {
            formRef.current = { ...formRef.current, senha: e.target.value };
          }}
          required
        />

        <label className="block mb-1 text-xs font-bold text-slate-700">
          Confirmar senha
        </label>
        <input
          className="w-full h-10 border border-black/15 pl-3 rounded mb-4"
          type="password"
          placeholder="********"
          onChange={(e) => {
            formRef.current = { ...formRef.current, senha2: e.target.value };
          }}
          required
        />

        <button
          onClick={cadastrar}
          className="w-full h-10 bg-verde hover:bg-verde/70 duration-200 text-white font-bold rounded mb-4 cursor-pointer"
        >
          Criar uma conta
        </button>

        <p className="text-xs text-center text-slate-500">
          Já possui uma conta?{" "}
          <a className="underline hover:text-verde" href="/login">
            Faça login
          </a>{" "}
        </p>
      </form>
    </div>
  );
};

export default Cadastro;
