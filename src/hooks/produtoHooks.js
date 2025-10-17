"use client"
import { API } from "../services"
import { useQuery } from "@tanstack/react-query"

export const useBuscarProdutos = () => {
    return useQuery({
        queryKey: ["Produtos"],
        queryFn: async () => {
            const resposta = await API.get("/produtos")
            return resposta.data
        }
    })
}