"use client"
import { BiSearch, BiShoppingBag } from "react-icons/bi";
import { AiOutlineUser } from "react-icons/ai";
import LogoMenor from "@/assets/LogoMenor.png"
import Image from 'next/image'
import { useContext, useState } from "react";
import Carrinho from "./Carrinho";
import { CarrinhoContext } from "@/contexts/CarrinhoContext";

const Header = () => {
    const [mostrarGaveta, setMostrarGaveta] = useState(false)
    const {carrinho} = useContext(CarrinhoContext)

    function mostrarCarrinho() {
        setMostrarGaveta(true)
    }

    return (
        <>
            <header className="items-center z-10 w-full bg-white border-b border-black/15 flex justify-between px-15 py-7 fixed top-0 left-0">
                <nav>
                    <ul className="flex gap-6 *:border-b *:border-transparent *:duration-200 *:hover:border-black">
                        <li>
                            <a href="/">Início</a>
                        </li>
                        <li>
                            <a href="/">Biquínis</a>
                        </li>
                        <li>
                            <a href="/">Cangas</a>
                        </li>
                        <li>
                            <a href="/">Maiôs</a>
                        </li>
                    </ul>
                </nav>
                <div className="absolute top-1/2 left-1/2 -translate-1/2">
                    <Image className="w-[50px]" src={LogoMenor} alt="Iguana Jeri" />
                </div>
                <div className="flex gap-4 items-center">
                    <div className="flex items-center">
                        <input className="h-[30px] border-b focus:outline-0 focus:border-verde duration-200" placeholder="Pesquisar" type="text" /> 
                        <BiSearch size={22} className="hover:text-verde duration-200 cursor-pointer"/>   
                    </div>
                    <a href="/login" className="hover:text-verde duration-200">
                        <AiOutlineUser size={24}/>
                    </a>
                    <div className="relative">
                        <BiShoppingBag size={24} className="hover:text-verde duration-200 cursor-pointer" onClick={mostrarCarrinho}/>
                        {
                            carrinho.length > 0 && (
                                <div className="absolute top-0 right-0 translate-x-1/2 leading-[14px] text-[10px] px-[4px] bg-verde rounded-2xl text-white">{carrinho.length}</div>
                            )
                        }
                    </div>
                </div>
            </header>
            <div className={`z-10 w-full h-screen bg-black/70 fixed top-0 left-0 cursor-pointer duration-200 ${mostrarGaveta ? "" : "opacity-0 invisible"}`} onClick={() => setMostrarGaveta(false)}></div>
            <div className={`z-10 w-[400px] h-screen bg-white fixed top-0 right-0 duration-200 ${mostrarGaveta ? "" : "opacity-0 invisible"}`}>
                <Carrinho/>
            </div>    
        </>
    );
}
 
export default Header;