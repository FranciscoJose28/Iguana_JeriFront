"use client"

import ItemResumo from "@/components/ItemResumo";
import { AntContext } from "@/contexts/AntContext";
import { CarrinhoContext } from "@/contexts/CarrinhoContext";
import { useBuscarEstados } from "@/hooks/utilHooks";
import { API } from "@/services";
import { CardPayment } from "@mercadopago/sdk-react";
import { useMask } from "@react-input/mask";
import axios from "axios";
import { useContext, useRef, useState } from "react";
import { LuReceiptText } from "react-icons/lu";

const FinalizarCompra = () => {
    const { carrinho } = useContext(CarrinhoContext)
    const { data: estados } = useBuscarEstados()
    const { api } = useContext(AntContext)
    const enderecoREF = useRef(null)
    const bairroREF = useRef(null)
    const cidadeREF = useRef(null)
    const estadoREF = useRef(null)
    const cepREF = useMask({
        mask: '_____-___',
        replacement: { _: /\d/ },
    });
    const [fretes, setFretes] = useState([])
    const [freteSelecionado, setFreteSelecionado] = useState(null)

    const freteSelecionadoInfo = fretes.find((frete) => frete.id === freteSelecionado)
    const valorFrete = freteSelecionadoInfo ? Number(freteSelecionadoInfo.price) : 0
    const subtotal = carrinho.reduce((total, produto) => total + (produto.valor * produto.quantidade), 0)
    const total = carrinho.reduce((total, produto) => total + ((produto.valor - produto.desconto) * produto.quantidade), 0) + valorFrete
    const desconto = carrinho.reduce((total, produto) => total + ((produto.desconto) * produto.quantidade), 0) * -1


    async function buscarCEP(cep) {
        try {
            const request = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
            const response = request.data;

            if (response.erro) {
                api.warning({
                    description: "CEP inválido"
                })
                return;
            }

            enderecoREF.current.value = response.logradouro;
            bairroREF.current.value = response.bairro;
            cidadeREF.current.value = response.localidade;
            estadoREF.current.value = response.uf;
            buscarFretes(cep)
        }
        catch (error) {
            console.error("Erro ao buscar CEP:", error);
        }
    }

    async function buscarFretes(cep) {
        let dados = {
            from: {
                postal_code: "60050150"
            },
            to: {
                postal_code: cep
            },
            products: carrinho.map(produto => {
                return {
                    id: produto.id,
                    width: 19,
                    height: 3,
                    length: 25,
                    weight: produto.peso,
                    quantity: 1
                }
            })
        }
        const request = await API.post("/frete", dados)
        setFretes(request.data.filter((transportadora) => {
            return transportadora.error == null
        }));

    }

    return (
        <div className="max-w-6xl mx-auto items-start py-30 grid grid-cols-2 gap-8 relative">
            <div>
                <div className="bg-white mb-4 p-4 rounded">
                    <div className="flex items-center mb-4">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-verde text-white font-semibold mr-3">
                            1
                        </div>
                        <h2 className="text-2xl font-serif text-verde">Seus Dados</h2>
                    </div>
                    <p className="text-gray-600 mb-6">
                        Aqui, só o necessário. Usamos suas informações com todo cuidado — e apenas para realizar sua compra.
                    </p>

                    <form className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">E-mail</label>
                            <input type="email" className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-1 focus:ring-verde" />
                        </div>

                        <div className="grid grid-cols-1 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Nome</label>
                                <input type="text" className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-1 focus:ring-verde" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Sobrenome</label>
                                <input type="text" className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-1 focus:ring-verde" />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">CPF</label>
                                <input type="text" placeholder="999.999.999-99" className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-1 focus:ring-verde" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Telefone</label>
                                <input type="tel" placeholder="11 99999-9999" className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-1 focus:ring-verde" />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Data de Nascimento</label>
                            <input type="text" placeholder="dd/mm/aaaa" className="w-full sm:w-1/2 border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-1 focus:ring-verde" />
                        </div>

                        <div className="flex items-center gap-2 pt-2">
                            <input type="checkbox" id="promocoes" className="accent-verde" />
                            <label htmlFor="promocoes" className="text-sm text-gray-700">Quero receber e-mails com promoções.</label>
                        </div>

                        <button type="submit" className="w-full bg-verde text-white py-3 rounded-md mt-4 hover:bg-verde transition cursor-pointer">
                            Ir para a Entrega
                        </button>
                    </form>
                </div>
                <div className="bg-white mb-4 p-4 rounded">
                    <div className="flex items-center mb-4">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-verde text-white font-semibold mr-3">
                            2
                        </div>
                        <h2 className="text-2xl font-serif text-verde">Sua Entrega</h2>
                    </div>
                    <form className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">CEP</label>
                            <input
                                ref={cepREF}
                                onKeyUp={(evento) => {
                                    if (evento.target.value.length == 9) {
                                        buscarCEP(evento.target.value.replace("-", ""))
                                    }
                                }}
                                // onInput={(evento) => {
                                //     console.log(evento.target.value.replace("-", ""));

                                // cepREF.current = evento.target.value.replace("-", "")
                                // }}
                                // value={cepREF.current.value}
                                maxLength={9}
                                type="text"
                                className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-1 focus:ring-verde"
                            />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Endereço</label>
                                <input ref={enderecoREF} type="text" className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-1 focus:ring-verde" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Número</label>
                                <input type="text" className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-1 focus:ring-verde" />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Complemento</label>
                                <input type="text" className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-1 focus:ring-verde" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Bairro</label>
                                <input ref={bairroREF} type="text" className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-1 focus:ring-verde" />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Cidade</label>
                                <input ref={cidadeREF} type="text" className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-1 focus:ring-verde" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Estado</label>
                                <select
                                    ref={estadoREF}
                                    className="w-full border border-gray-300 rounded-md h-12! focus:outline-none focus:ring-1 focus:ring-verde" >
                                    {
                                        (estados || []).map(estado => (
                                            <option key={estado.id}>{estado.sigla}</option>
                                        ))
                                    }
                                </select>
                            </div>
                        </div>

                        <div>
                            <div className="mb-5 mt-7 font-serif text-sm text-slate-800">Formas de entrega</div>
                            {
                                fretes.map(frete => (
                                    <label
                                        key={frete.id}
                                        htmlFor={`frete-${frete.id}`}
                                        className={`flex justify-between items-center pb-3 p-3 rounded transition cursor-pointer ${freteSelecionado === frete.id ? 'border border-verde bg-green-50' : 'border border-slate-200 hover:border-verde hover:bg-slate-50'}`}
                                        onClick={() => setFreteSelecionado(frete.id)}
                                    >
                                        <div className="flex items-center gap-3">
                                            <input
                                                id={`frete-${frete.id}`}
                                                name="freteEscolhido"
                                                type="radio"
                                                className="w-5 h-5 accent-verde"
                                                checked={freteSelecionado === frete.id}
                                                onChange={() => setFreteSelecionado(frete.id)}
                                            />
                                            <div>
                                                <div className="font-semibold text-slate-700">{frete.name}</div>
                                                <div className="text-xs text-slate-400">Em até {frete.delivery_time} dias úteis</div>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="border-l border-slate-200 pl-4 text-slate-500 text-lg">R$ {frete.price}</div>
                                        </div>
                                    </label>
                                ))
                            }
                        </div>

                        <button type="submit" className="w-full bg-verde text-white py-3 rounded-md mt-4 hover:bg-verde transition cursor-pointer">
                            Ir para a Entrega
                        </button>
                    </form>
                </div>
                <div className="bg-white mb-4 p-4 rounded">
                    <div className="flex items-center mb-4">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-verde text-white font-semibold mr-3">
                            3
                        </div>
                        <h2 className="text-2xl font-serif text-verde">Pagamento</h2>
                    </div>
                    <CardPayment
                        initialization={{
                            amount: total
                        }}
                    />
                </div>
            </div>

            <div className="sticky top-30 bg-white p-4 rounded">
                <div className="flex items-center gap-3 mb-4 border-b border-black/40">
                    <LuReceiptText size={24} className="text-verde" />
                    <span className="text-2xl font-serif text-verde">Resumo do pedido</span>
                </div>

                <div className="flex-1 overflow-auto">
                    {carrinho.map((produto) => (
                        <ItemResumo {...produto} key={produto.id} />
                    ))}
                </div>
                <div className="flex justify-between items-center mb-4">
                    <h6 className="text-gray-500 font-semibold">Subtotal</h6>
                    R$ {subtotal.toFixed(2)}
                </div>
                <div className="flex justify-between items-center mb-4 text-red-500">
                    <h6 className="text-gray-500 font-semibold">Desconto</h6>
                    R$ {desconto.toFixed(2)}
                </div>
                <div className="flex justify-between items-center mb-4">
                    <h6 className="text-gray-500 font-semibold">Entrega</h6>
                    R$ {valorFrete.toFixed(2)}
                </div>
                <div className="flex justify-between items-center mb-4">
                    <h6 className="text-gray-500 font-semibold">Total</h6>
                    R$ {total.toFixed(2)}
                </div>


            </div>

        </div>
    );
}

export default FinalizarCompra;