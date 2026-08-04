"use client"
import { createContext, useEffect, useState } from "react";

export const CarrinhoContext = createContext()

const CarrinhoProvider = ({children}) => {
    const [carrinho, setCarrinho] = useState([]);
    const [mostrarGaveta, setMostrarGaveta] = useState(false);
    const [urlProduto, setUrlProduto] = useState("");
    const [mostrarLogin, setMostrarLogin] = useState(false);

    useEffect(() => {
        if (typeof window === "undefined") return;

        try {
            const carrinhoSalvo = sessionStorage.getItem("carrinho");
            if (carrinhoSalvo) {
                const carrinhoCarregado = JSON.parse(carrinhoSalvo);
                if (Array.isArray(carrinhoCarregado)) {
                    setCarrinho(carrinhoCarregado);
                }
            }
        } catch (error) {
            console.error("Erro ao carregar carrinho da sessão:", error);
        }
    }, []);

    useEffect(() => {
        if (typeof window !== "undefined") {
            sessionStorage.setItem("carrinho", JSON.stringify(carrinho));
        }
    }, [carrinho]);

    return (
        <CarrinhoContext.Provider value={{carrinho, setCarrinho, mostrarGaveta, setMostrarGaveta, urlProduto, setUrlProduto, mostrarLogin, setMostrarLogin}}>
            {children}
        </CarrinhoContext.Provider>
    );
}
 
export default CarrinhoProvider;