"use client"
import Image from "next/image";
import produto1 from "@/assets/produto1.jpg"

const ProdutoDetalhe = () => {
    return (
        <div className="flex justify-between py-35 px-60">
            <div>
                <Image className="rounded-xl object-cover w-[600px] h-[600px]" src={produto1} alt="foto do produto"/>
            </div>

            <div className="flex flex-col gap-6">
                <div>
                    <h2 className="text-xl font-semibold">Descrição do produto</h2>
                    <div className="flex items-center gap-2">
                        <p className="text-black mt-2">Preço</p>
                        <p className="text-sm text-gray-500">Parcelas</p>
                    </div>
                </div>

                <div>
                    <h3 className="font-semibold">Tamanhos:</h3>
                    <div className="flex gap-3 mt-2">
                        <span className="border px-3 py-1 rounded cursor-pointer hover:border-verde duration-200">P</span>
                        <span className="border px-3 py-1 rounded cursor-pointer hover:border-verde duration-200">M</span>
                        <span className="border px-3 py-1 rounded cursor-pointer hover:border-verde duration-200">G</span>
                    </div>
                </div>

                <button className="bg-black text-white py-3 px-6 rounded hover:bg-verde duration-200 cursor-pointer">
                    Adicionar ao carrinho
                </button>
            </div>
      </div>
    );
}
 
export default ProdutoDetalhe;