"use client"
import { queryClient } from "@/contexts/QueryClient"
import { API } from "@/services"
import { useMutation, useQuery } from "@tanstack/react-query"

export const useBuscarBanners = () => {
    return useQuery({
        queryKey: ["banners"],
        queryFn: async () => {
            const resposta = await API.get("/banners")
            return resposta.data
        }
    })
}

export const useBuscarBanner = () => {
    return useMutation({
        mutationFn: async (id) => {
            const resposta = await API.get(`/banners/${id}`)
            return resposta.data
        }
    })
}

export const useCriarBanner = () => {
    return useMutation({
        mutationFn: async (dados) => {
            const resposta = await API.post("/banners", dados, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })
            return resposta.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey:["banners"]
            })
        }
    })
}

export const useEditarBanner = () => {
    return useMutation({
        mutationFn: async (dados) => {
            const resposta = await API.post(`/banners/${dados.id}`, dados, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })
            return resposta.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey:["banners"]
            })
        }
    })
}

export const useDeletarBanner = () => {
    return useMutation({
        mutationFn: async (id) => {
            const resposta = await API.delete(`/banners/${id}`)
            return resposta.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey:["banners"]
            })
        }
    })
}