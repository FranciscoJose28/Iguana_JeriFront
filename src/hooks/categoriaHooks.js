"use client"
import { queryClient } from "@/contexts/QueryClient"
import { API } from "@/services"
import { useMutation, useQuery } from "@tanstack/react-query"
import { use } from "react"

export const useBuscarCategorias = () => {
    return useQuery({
        queryKey: ["categorias"],
        queryFn: async () => {
            const resposta = await API.get("/categorias")
            return resposta.data
        }
    })
}

export const useCriarCategoria = () => {
    return useMutation({
        mutationFn: async (dados) => {
            const resposta = await API.post("/categorias", dados)
            return resposta.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey:["categorias"]
            })
        }
    })
}
export const useEditarCategoria = () => {
    return useMutation({
        mutationFn: async (dados) => {
            const resposta = await API.put(`/categorias/${dados.id}`, dados)
            return resposta.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey:["categorias"]
            })
        }
    })
}
export const useDeletarCategoria = () => {
    return useMutation({
        mutationFn: async (id) => {
            const resposta = await API.delete(`/categorias/${id}`)
            return resposta.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey:["categorias"]
            })
        }
    })
}