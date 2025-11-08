"use client"
import { queryClient } from "@/contexts/QueryClient"
import { API } from "@/services"
import { useMutation, useQuery } from "@tanstack/react-query"

export const useBuscarClientes = () => {
    return useQuery({
        queryKey: ["clientes"],
        queryFn: async () => {
            const resposta = await API.get("/clientes")
            return resposta.data
        }
    })
}

export const useCriarCliente = () => {
    return useMutation({
        mutationFn: async (dados) => {
            const resposta = await API.post("/clientes", dados)
            return resposta.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey:["clientes"]
            })
        }
    })
}
export const useEditarCliente = () => {
    return useMutation({
        mutationFn: async (dados) => {
            const resposta = await API.put(`/clientes/${dados.id}`, dados)
            return resposta.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey:["clientes"]
            })
        }
    })
}
export const useDeletarCliente = () => {
    return useMutation({
        mutationFn: async (id) => {
            const resposta = await API.delete(`/clientes/${id}`)
            return resposta.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey:["clientes"]
            })
        }
    })
}

export const useLogin = () => {
    return useMutation({
        mutationFn: async (dados) => {
            const resposta = await API.post("/login", dados)
            return resposta.data
        }
    })
}