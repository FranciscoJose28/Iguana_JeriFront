"use client"
import { useEffect, useState } from "react";
import { BiChevronRight, BiSolidHeart, BiSolidLogIn, BiSolidShoppingBag, BiSolidUserCircle } from "react-icons/bi";

const PerfilLayout = ({children}) => {
    const [usuario, setUsuario] = useState("")
    useEffect(() => {
        const dados = JSON.parse(sessionStorage.getItem("usuario"))
        setUsuario(dados)
    }, [])
    return (
        <div className="pt-30 px-30 flex gap-10 items-start">
            <div className="w-70">
                <h1 className="text-2xl">Olá <span className="text-verde">{usuario.nome}</span></h1>
                <ul className="mt-5 bg-white rounded *:cursor-pointer">
                    <li>
                        <a className="flex items-center text-lg justify-between hover:text-verde duration-200 p-4 hover:bg-slate-100"> <div className="flex items-center gap-3"><BiSolidUserCircle/> Meus dados</div> <BiChevronRight /></a>
                    </li>
                    <li>
                        <a className="flex items-center text-lg justify-between hover:text-verde duration-200 p-4 hover:bg-slate-100"><div className="flex items-center gap-3"><BiSolidShoppingBag /> Meus pedidos</div> <BiChevronRight /></a>
                    </li>
                    <li>
                        <a className="flex items-center text-lg justify-between hover:text-verde duration-200 p-4 hover:bg-slate-100"><div className="flex items-center gap-3"><BiSolidHeart /> Favoritos</div> <BiChevronRight /></a>
                    </li>
                    <li>
                        <a className="flex items-center text-lg justify-between hover:text-verde duration-200 p-4 hover:bg-slate-100"> <div className="flex items-center gap-3"><BiSolidLogIn /> Sair</div> <BiChevronRight /></a>
                    </li>
                </ul>
            </div>
            {children}
        </div>
    );
}
 
export default PerfilLayout;