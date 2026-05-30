"use client"

import { useBuscarFavoritos } from "@/hooks/produtoHooks";
import Image from "next/image";
import { useEffect, useState } from "react";

const Favoritos = () => {
    const [usuario, setUsuario] = useState(null);
    const { data: favoritos = [] } = useBuscarFavoritos(usuario?.id);

    useEffect(() => {
        const u = JSON.parse(sessionStorage.getItem("usuario"));
        setUsuario(u);
    }, []);

    return (
        <div>
            <h1 className="text-2xl mb-5">Favoritos</h1>
            <div className="grid grid-cols-4 gap-4">
                {
                    (favoritos || []).map(favorito => (
                        <div key={favorito.id}>
                            <div className="relative w-full h-64">
                                <Image
                                    src={favorito.produto.produto_imagem[0].imagem}
                                    alt={favorito.produto.nome}
                                    fill
                                    priority={false}
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 300px"
                                    className="rounded-lg object-cover"
                                />
                            </div>
                            <h3 className="text-center uppercase mt-3 line-clamp-2">{favorito.produto.nome}</h3>
                            <h3 className="text-center text-2xl mt-3">R${favorito.produto.valor.toFixed(2)}</h3>
                            <p className="text-center text-sm text-gray-500">Em até 2x de R$ {(favorito.produto?.valor / 2).toFixed(2)} sem juros</p>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

export default Favoritos;