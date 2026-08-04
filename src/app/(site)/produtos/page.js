"use client"

import { useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Produto from "@/components/Produto";
import { useBuscarCategorias } from "@/hooks/categoriaHooks";
import { useBuscarProdutos } from "@/hooks/produtoHooks";
import { Select } from "antd";

const normalizarValor = (valor = "") =>
    valor
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-");

const Produtos = () => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const { data: categorias } = useBuscarCategorias()

    const queryString = useMemo(() => {
        const params = new URLSearchParams()

        const cat = searchParams.get("cat")
        const busca = searchParams.get("busca")

        if (cat) {
            const categoriasSelecionadas = cat.split(",").filter(Boolean)
            if (categoriasSelecionadas.length > 1) {
                params.set("cat", categoriasSelecionadas.join(","))
            } else {
                params.set("cat", cat)
            }
        }

        if (busca) params.set("busca", busca)

        return params.toString() ? `?${params.toString()}` : ""
    }, [searchParams])

    const { data: produtos } = useBuscarProdutos(queryString)

    const handleCategoriaClick = (categoriaNome) => {
        const params = new URLSearchParams(searchParams.toString())
        const valorCategoria = categoriaNome.trim()
        const categoriasSelecionadas = (params.get("cat") || "")
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean)

        const categoriasSelecionadasNormalizadas = categoriasSelecionadas.map(normalizarValor)
        const indiceCategoria = categoriasSelecionadasNormalizadas.indexOf(normalizarValor(valorCategoria))

        if (indiceCategoria >= 0) {
            categoriasSelecionadas.splice(indiceCategoria, 1)
        } else {
            categoriasSelecionadas.push(valorCategoria)
        }

        if (categoriasSelecionadas.length > 0) {
            params.set("cat", categoriasSelecionadas.join(","))
        } else {
            params.delete("cat")
        }

        router.push(`/produtos?${params.toString()}`)
    }

    const handleOrdenacaoChange = (valor) => {
        const params = new URLSearchParams(searchParams.toString())

        if (valor) {
            params.set("ordenacao", valor)
        } else {
            params.delete("ordenacao")
        }

        router.push(`/produtos?${params.toString()}`)
    }

    return (
        <div className="flex gap-9 items-start px-30 pt-15 mb-10">
            <div className="w-75">
                <h3 className="text-xl text-slate-600 mb-3">Categorias</h3>
                <div className="flex flex-col gap-2">
                    {(categorias || []).map((categoria) => {
                        const categoriasSelecionadas = (searchParams.get("cat") || "")
                            .split(",")
                            .map((item) => item.trim())
                            .filter(Boolean)
                        const estaSelecionada = categoriasSelecionadas.some(
                            (item) => normalizarValor(item) === normalizarValor(categoria.nome)
                        )

                        return (
                            <button
                                key={categoria.id}
                                type="button"
                                className="flex items-center gap-2 cursor-pointer text-sm text-left"
                                onClick={() => handleCategoriaClick(categoria.nome)}
                            >
                                <input
                                    type="checkbox"
                                    className="w-4 h-4 accent-verde cursor-pointer"
                                    checked={estaSelecionada}
                                    readOnly
                                />
                                <div>{categoria.nome}</div>
                            </button>
                        )
                    })}
                </div>
            </div>
            <div>
                <div className="flex justify-end items-center gap-4">
                    <h5>Ordenar por:</h5>
                    <Select className="w-40"
                        placeholder="Selecione um filtro"
                        value={searchParams.get("ordenacao") || undefined}
                        onChange={handleOrdenacaoChange}
                        options={[
                            {
                                value:"menor-preco",
                                label:"Menor preço"
                            },
                            {
                                value:"maior-preco",
                                label:"Maior preço"
                            },
                            {
                                value:"mais-vendido",
                                label:"Mais vendido"
                            }
                        ]}
                    />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 lg:px-0 gap-4 px-6 py-10">
                    {(produtos || []).map((produto) => (
                        <Produto key={produto.id} {...produto} />
                    ))}
                </div>
            </div>

        </div>
    );
}

export default Produtos;