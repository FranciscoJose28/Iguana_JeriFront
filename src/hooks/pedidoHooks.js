"use client"
import { queryClient } from "@/contexts/QueryClient"
import { API } from "@/services"
import { useMutation, useQuery } from "@tanstack/react-query"

export const useBuscarPedidos = (id = null) => {
    return useQuery({
        queryKey: ["pedidos", id],
        queryFn: async () => {
            const resposta = await API.get(id ? `/pedidos?id_cliente=${id}` : "/pedidos")
            return resposta.data
        },
        enabled: Boolean(id),
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