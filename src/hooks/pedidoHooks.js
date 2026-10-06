"use client"
import { queryClient } from "@/contexts/QueryClient"
import { API } from "@/services"
import { useMutation, useQuery } from "@tanstack/react-query"

export const useBuscarPedidos = (id = null, status = null, cliente = null) => {
    return useQuery({
        queryKey: ["pedidos", id],
        queryFn: async () => {
            const resposta = await API.get(id ? `/pedidos?id_cliente=${id}&status=${status}` : `/pedidos?status=${status.toString()}&cliente=${cliente}`)
            return resposta.data
        },
    })
}

export const useEditarPedidos = () => {
    return useMutation({
        mutationFn: async (dados) => {
            const resposta = await API.put(`/pedidos/${dados.id}`, dados)
            return resposta.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey:["pedidos"]
            })
        }
    })
}

export const useBuscarPedido = () => {
    return useMutation({
        mutationFn: async (id) => {
            const resposta = await API.get(`/pedidos/${id}`)
            return resposta.data
        }
    })
}