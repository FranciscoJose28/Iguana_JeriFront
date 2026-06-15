"use client"
import { useEffect, useState } from "react";
import { BiChevronRight, BiSolidHeart, BiSolidLogIn, BiSolidShoppingBag, BiSolidUserCircle } from "react-icons/bi";

const PerfilLayout = ({ children }) => {
    const [usuario, setUsuario] = useState("")
    useEffect(() => {
        const dados = JSON.parse(sessionStorage.getItem("usuario"))
        const token = sessionStorage.getItem("token");

        if (!token) {
            window.location.href= "/";
            return;
        }
        setUsuario(dados)
    }, [])
    return (
        <div className="pt-6 sm:pt-6 px-6 sm:px-30 flex flex-col sm:flex-row gap-6 sm:gap-10 items-start">
            <div className="w-full sm:w-72">
                <h1 className="text-2xl">Olá <span className="text-verde">{usuario.nome}</span></h1>
                <ul className="mt-5 bg-white rounded *:cursor-pointer">
                    <li>
                        <a href="/meu-perfil" className="flex items-center text-lg justify-between hover:text-verde duration-200 p-4 hover:bg-slate-100"> <div className="flex items-center gap-3"><BiSolidUserCircle /> Meus dados</div> <BiChevronRight /></a>
                    </li>
                    <li>
                        <a href="/meu-perfil/pedidos" className="flex items-center text-lg justify-between hover:text-verde duration-200 p-4 hover:bg-slate-100"><div className="flex items-center gap-3"><BiSolidShoppingBag /> Meus pedidos</div> <BiChevronRight /></a>
                    </li>
                    <li>
                        <a href="/meu-perfil/favoritos" className="flex items-center text-lg justify-between hover:text-verde duration-200 p-4 hover:bg-slate-100"><div className="flex items-center gap-3"><BiSolidHeart /> Favoritos</div> <BiChevronRight /></a>
                    </li>
                    <li>
                        <a onClick={() => {
                            sessionStorage.clear()
                            window.location.href = "/"
                        }} className="flex items-center text-lg justify-between hover:text-verde duration-200 p-4 hover:bg-slate-100"> <div className="flex items-center gap-3"><BiSolidLogIn /> Sair</div> <BiChevronRight /></a>
                    </li>
                </ul>
            </div>
            <div className="flex-1">
                {children}
            </div>
        </div>
    );
}

export default PerfilLayout;