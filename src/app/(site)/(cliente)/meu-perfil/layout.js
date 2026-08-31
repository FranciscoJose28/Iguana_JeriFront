"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { BiChevronRight, BiSolidHeart, BiSolidLogIn, BiSolidShoppingBag, BiSolidUserCircle } from "react-icons/bi";

const PerfilLayout = ({ children }) => {
    const [usuario, setUsuario] = useState(null)
    const pathname = usePathname();
    const itemAtivo = (rota) =>
        pathname === rota
            ? "text-verde bg-slate-100 font-semibold"
            : "hover:text-verde hover:bg-slate-100";

    useEffect(() => {
        const dados = JSON.parse(sessionStorage.getItem("usuario"))
        const token = sessionStorage.getItem("token");

        if (!token) {
            window.location.href = "/";
            return;
        }
        setUsuario(dados)
    }, [])

    return (
        <div className="pt-6 sm:pt-6 px-6 sm:px-30 flex flex-col sm:flex-row gap-6 sm:gap-10 items-start mb-15">
            <div className="w-full sm:w-72">
                <h1 className="text-2xl">Olá <span className="text-verde">{usuario?.nome}</span></h1>
                <ul className="mt-5 bg-white rounded *:cursor-pointer">
                    <li>
                        <Link href="/meu-perfil" className={`flex items-center text-lg justify-between duration-200 p-4 ${itemAtivo("/meu-perfil")}`}> <div className="flex items-center gap-3"><BiSolidUserCircle /> Meus dados</div> <BiChevronRight /></Link>
                    </li>
                    <li>
                        <Link href="/meu-perfil/pedidos" className={`flex items-center text-lg justify-between duration-200 p-4 ${itemAtivo("/meu-perfil/pedidos")}`}><div className="flex items-center gap-3"><BiSolidShoppingBag /> Meus pedidos</div> <BiChevronRight /></Link>
                    </li>
                    <li>
                        <Link href="/meu-perfil/favoritos" className={`flex items-center text-lg justify-between duration-200 p-4 ${itemAtivo("/meu-perfil/favoritos")}`}><div className="flex items-center gap-3"><BiSolidHeart /> Favoritos</div> <BiChevronRight /></Link>
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