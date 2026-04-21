import { useQuery } from "@tanstack/react-query"

const { default: axios } = require("axios")

export const useBuscarEstados = () => {
    return useQuery({
        queryKey: ["estados"],
        queryFn: async () => {
            const resposta = await axios.get("https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome")
            return resposta.data
        }
    })
}