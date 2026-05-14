"use client"
import { createContext, useState } from "react";

export const CarrinhoContext = createContext()

const CarrinhoProvider = ({children}) => {
    const [carrinho, setCarrinho] = useState([])
    const [mostrarGaveta, setMostrarGaveta] = useState(false)
    const [urlProduto, setUrlProduto] = useState("")
    return (
        <CarrinhoContext.Provider value={{carrinho, setCarrinho, mostrarGaveta, setMostrarGaveta, urlProduto, setUrlProduto}}>
            {children}
        </CarrinhoContext.Provider>
    );
}
 
export default CarrinhoProvider;