"use client"
import { queryClient } from "@/contexts/QueryClient"
import { API } from "@/services"
import { useMutation, useQuery } from "@tanstack/react-query"

export const useBuscarProdutos = () => {
    return useQuery({
        queryKey: ["produtos"],
        queryFn: async () => {
            const resposta = await API.get("/produtos")
            return resposta.data
        }
    })
}

export const useCriarProduto = () => {
    return useMutation({
        mutationFn: async (dados) => {
            const resposta = await API.post("/produtos", dados)
            return resposta.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey:["produtos"]
            })
        }
    })
}
export const useEditarProduto = () => {
    return useMutation({
        mutationFn: async (dados) => {
            const resposta = await API.put(`/produtos/${dados.id}`, dados)
            return resposta.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey:["produtos"]
            })
        }
    })
}
export const useDeletarProduto = () => {
    return useMutation({
        mutationFn: async (id) => {
            const resposta = await API.delete(`/produtos/${id}`)
            return resposta.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey:["produtos"]
            })
        }
    })
}

export const useCriarImagem = () => {
    return useMutation({
        mutationFn: async (dados) => {
            const resposta = await API.post("/produtos/imagem", dados, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })
            return resposta.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey:["produtos"]
            })
        }
    })
}