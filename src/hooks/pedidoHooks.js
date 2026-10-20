"use client"
import { queryClient } from "@/contexts/QueryClient"
import { API } from "@/services"
import { useMutation, useQuery } from "@tanstack/react-query"

export const useBuscarPedidos = (id = null, status = null, cliente = null) => {
    return useQuery({
        queryKey: ["pedidos", id, status, cliente],

        queryFn: async () => {
            const params = new URLSearchParams();

            if (id) {
                params.append("id_cliente", id);
            }

            if (status) {
                params.append("status", Array.isArray(status) ? status.join(",") : status);
            }

            if (cliente) {
                params.append("cliente", cliente);
            }

            const resposta = await API.get(`/pedidos?${params.toString()}`);

            return resposta.data;
        },
    });
};

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