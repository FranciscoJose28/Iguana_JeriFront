"use client"
import { createContext, useState } from "react";

export const CarrinhoContext = createContext()

const CarrinhoProvider = ({children}) => {
    const [carrinho, setCarrinho] = useState([])
    const [mostrarGaveta, setMostrarGaveta] = useState(false)
    return (
        <CarrinhoContext.Provider value={{carrinho, setCarrinho, mostrarGaveta, setMostrarGaveta}}>
            {children}
        </CarrinhoContext.Provider>
    );
}
 
export default CarrinhoProvider;