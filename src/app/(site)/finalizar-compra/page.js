"use client"

import ItemResumo from "@/components/ItemResumo";
import { AntContext } from "@/contexts/AntContext";
import { CarrinhoContext } from "@/contexts/CarrinhoContext";
import { useBuscarEstados } from "@/hooks/utilHooks";
import { API } from "@/services";
import { CardPayment, Payment } from "@mercadopago/sdk-react";
import { useMask } from "@react-input/mask";
import Confetti from "react-confetti";
import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { LuReceiptText } from "react-icons/lu";

const FinalizarCompra = () => {
    const { carrinho } = useContext(CarrinhoContext)

    const { data: estados } = useBuscarEstados()
    const { api } = useContext(AntContext)
    const enderecoREF = useRef(null)
    const bairroREF = useRef(null)
    const cidadeREF = useRef(null)
    const estadoREF = useRef(null)
    const numeroREF = useRef(null)
    const complementoREF = useRef(null)
    const cepREF = useMask({
        mask: '_____-___',
        replacement: { _: /\d/ },
    });
    const [fretes, setFretes] = useState([])
    const [freteSelecionado, setFreteSelecionado] = useState(null)
    const router = useRouter();
    const [preferenceId, setPreferenceId] = useState(null)
    const [criandoPagamento, setCriandoPagamento] = useState(false)
    const [verEntrega, setVerEntrega] = useState(false)
    const [showSuccessModal, setShowSuccessModal] = useState(false)
    const [windowSize, setWindowSize] = useState({ width: 0, height: 0 })
    const [dadosCliente, setDadosCliente] = useState({
        nome: "",
        sobrenome: "",
        email: "",
    })
    const [cpf, setCpf] = useState("");
    const [telefone, setTelefone] = useState("");
    const [nascimento, setNascimento] = useState("");
    const [senha, setSenha] = useState("");
    const [usuario, setUsuario] = useState(null);

    const handleDadosCliente = (campo) => (evento) => {
        setDadosCliente((anterior) => ({
            ...anterior,
            [campo]: evento.target.value,
        }))
    }

    const formatCPF = (value) => {
        return value
            .replace(/\D/g, "")
            .slice(0, 11)
            .replace(/(\d{3})(\d)/, "$1.$2")
            .replace(/(\d{3})(\d)/, "$1.$2")
            .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    };

    const formatTelefone = (value) => {
        const digits = value.replace(/\D/g, "").slice(0, 11);
        return digits
            .replace(/(\d{2})(\d)/, "($1) $2")
            .replace(/(\d{5})(\d)/, "$1-$2");
    };

    const formatNascimento = (value) => {
        return value
            .replace(/\D/g, "")
            .slice(0, 8)
            .replace(/(\d{2})(\d)/, "$1/$2")
            .replace(/(\d{2})(\d)/, "$1/$2");
    };

    const freteSelecionadoInfo = fretes.find((frete) => frete.id === freteSelecionado)
    const valorFrete = freteSelecionadoInfo ? Number(freteSelecionadoInfo.price) : 0
    const dias = freteSelecionadoInfo ? Number(freteSelecionadoInfo.delivery_time) : 0
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
            setPreferenceId(null);
            setFreteSelecionado(null);
            setFretes([]);
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

    async function criarPreferencia() {
        try {
            setCriandoPagamento(true);

            const dados = {
                nome: dadosCliente.nome,
                sobrenome: dadosCliente.sobrenome,
                email: dadosCliente.email,
                products: carrinho.map(produto => ({
                    id: produto.id,
                    quantity: produto.quantidade,
                })),
                shipping: {
                    id: freteSelecionadoInfo?.id,
                    name: freteSelecionadoInfo?.name,
                    price: Number(freteSelecionadoInfo?.price || 0),
                }
            };

            const request = await API.post("/produtos/preferencia", dados);

            setPreferenceId(request.data.id);

            return true;
        } catch (error) {
            console.error(error);

            api.error({
                message: "Erro",
                description: "Não foi possível iniciar o pagamento."
            });

            return false;
        } finally {
            setCriandoPagamento(false);
        }
    }

    async function continuarPagamento(evento) {
        evento.preventDefault();

        if (!freteSelecionado) {
            api.warning({
                description: "Selecione uma forma de entrega."
            });
            return;
        }

        const cep = cepREF.current?.value.replace(/\D/g, "") || "";
        const endereco = enderecoREF.current?.value.trim() || "";
        const numero = numeroREF.current?.value.trim() || "";
        const bairro = bairroREF.current?.value.trim() || "";
        const cidade = cidadeREF.current?.value.trim() || "";
        const estado = estadoREF.current?.value || "";

        if (cep.length !== 8) {
            api.warning({ description: "Informe um CEP válido." });
            return;
        }

        if (!endereco) {
            api.warning({ description: "Informe o endereço." });
            return;
        }

        if (!numero) {
            api.warning({ description: "Informe o número do endereço." });
            return;
        }

        if (!bairro) {
            api.warning({ description: "Informe o bairro." });
            return;
        }

        if (!cidade) {
            api.warning({ description: "Informe a cidade." });
            return;
        }

        if (!estado) {
            api.warning({ description: "Informe o estado." });
            return;
        }

        await criarPreferencia();
    }

    function irParaEntrega(evento) {
        evento.preventDefault();

        const onlyDigits = (s) => (s || "").replace(/\D/g, "");

        const isValidEmail = (email) => {
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email || "");
        }

        if (!isValidEmail(dadosCliente.email)) {
            api.warning({ description: "Informe um e-mail válido." });
            return;
        }

        if (!dadosCliente.nome || dadosCliente.nome.trim() === "") {
            api.warning({ description: "Informe seu nome." });
            return;
        }

        if (!dadosCliente.sobrenome || dadosCliente.sobrenome.trim() === "") {
            api.warning({ description: "Informe seu sobrenome." });
            return;
        }

        if (onlyDigits(cpf).length !== 11) {
            api.warning({ description: "Informe um CPF válido (11 dígitos)." });
            return;
        }

        if (onlyDigits(telefone).length < 10) {
            api.warning({ description: "Informe um telefone válido." });
            return;
        }

        if (!/^\d{2}\/\d{2}\/\d{4}$/.test(nascimento)) {
            api.warning({ description: "Informe a data de nascimento no formato dd/mm/aaaa." });
            return;
        }

        if (!senha || senha.trim().length < 6) {
            api.warning({ description: "Informe uma senha com pelo menos 6 caracteres." });
            return;
        }

        setVerEntrega(true);
    }

    const onSubmit = async ({ formData }) => {
        try {
            if (usuario) {
                formData.usuario_id = usuario.id
            } else {
                formData.nome = dadosCliente.nome;
                formData.sobrenome = dadosCliente.sobrenome;
                formData.email = dadosCliente.email;
                formData.cpf = cpf;
                formData.telefone = telefone;
                formData.nascimento = nascimento;
                formData.senha = senha;
            }
            formData.produtos = carrinho;
            formData.transportadora = freteSelecionadoInfo?.name || null;
            formData.valor_frete = valorFrete;
            formData.dias = dias;
            
            const { data } = await API.post(
                "/pagamentos",
                formData
            );

            if (data.tipo === "success") {

                api.success({
                    message: "Pagamento aprovado!"
                });
                setShowSuccessModal(true);

            } else {

                api.warning({
                    message: data.mensagem
                });

            }

        } catch (error) {

            api.error({
                message: "Erro ao processar pagamento."
            });

        }
    };

    const handleIrParaPedidos = () => {
        setShowSuccessModal(false);
        router.push("/meu-perfil/pedidos");
    };

    const onError = async (error) => {
        // callback chamado para todos os casos de erro do Brick
        console.log(error);
    };
    const onReady = async () => {
        /*
          Callback chamado quando o Brick estiver pronto.
          Aqui você pode ocultar loadings do seu site, por exemplo.
        */
    };

    useEffect(() => {
        const updateSize = () => {
            setWindowSize({ width: window.innerWidth, height: window.innerHeight });
        };

        updateSize();
        window.addEventListener("resize", updateSize);

        return () => window.removeEventListener("resize", updateSize);
    }, []);

    useEffect(() => {
        const u = sessionStorage.getItem("usuario");

        if (u) {
            setUsuario(JSON.parse(u));
            setVerEntrega(true)
        }
    }, []);

    return (
        <div className="max-w-6xl mx-auto px-6 sm:px-30 items-start py-10 grid grid-cols-1 lg:grid-cols-2 gap-8 relative">
            <div>
                {
                    !usuario && (
                        <div className="bg-white mb-4 p-4 rounded">
                            <div className="flex items-center mb-4">
                                {/* <div className="flex items-center justify-center w-8 h-8 rounded-full bg-verde text-white font-semibold mr-3">
                            1
                        </div> */}
                                <h2 className="text-2xl font-serif text-verde">Seus Dados</h2>
                            </div>
                            <p className="text-gray-600 mb-6">
                                Aqui, só o necessário. Usamos suas informações com todo cuidado — e apenas para realizar sua compra.
                            </p>

                            <form className="space-y-4" onSubmit={irParaEntrega}>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">E-mail</label>
                                    <input
                                        required
                                        type="email"
                                        value={dadosCliente.email}
                                        onChange={handleDadosCliente("email")}
                                        className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-1 focus:ring-verde"
                                    />
                                </div>

                                <div className="grid grid-cols-1 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Nome</label>
                                        <input
                                            required
                                            type="text"
                                            value={dadosCliente.nome}
                                            onChange={handleDadosCliente("nome")}
                                            className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-1 focus:ring-verde"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Sobrenome</label>
                                        <input
                                            required
                                            type="text"
                                            value={dadosCliente.sobrenome}
                                            onChange={handleDadosCliente("sobrenome")}
                                            className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-1 focus:ring-verde"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">CPF</label>
                                        <input
                                            required
                                            type="text"
                                            placeholder="999.999.999-99"
                                            value={cpf}
                                            onChange={(evento) => setCpf(formatCPF(evento.target.value))}
                                            className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-1 focus:ring-verde"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Telefone</label>
                                        <input
                                            required
                                            type="tel"
                                            placeholder="(00) 00000-0000"
                                            value={telefone}
                                            onChange={(evento) => setTelefone(formatTelefone(evento.target.value))}
                                            className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-1 focus:ring-verde"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Data de Nascimento</label>
                                        <input
                                            required
                                            type="text"
                                            placeholder="dd/mm/aaaa"
                                            value={nascimento}
                                            onChange={(evento) => setNascimento(formatNascimento(evento.target.value))}
                                            className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-1 focus:ring-verde"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Senha</label>
                                        <input
                                            required
                                            type="password"
                                            placeholder="Digite sua senha"
                                            value={senha}
                                            onChange={(evento) => setSenha(evento.target.value)}
                                            className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-1 focus:ring-verde"
                                        />
                                    </div>
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
                    )
                }

                <div className="bg-white mb-4 p-4 rounded">
                    <div className="flex items-center mb-4">
                        {/* <div className="flex items-center justify-center w-8 h-8 rounded-full bg-verde text-white font-semibold mr-3">
                            2
                        </div> */}
                        <h2 className="text-2xl font-serif text-verde">Sua Entrega</h2>
                    </div>

                    {
                        verEntrega ? (
                            <form className="space-y-4" onSubmit={continuarPagamento}>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">CEP</label>
                                    <input
                                        required
                                        ref={cepREF}
                                        onKeyUp={(evento) => {
                                            if (evento.target.value.length == 9) {
                                                buscarCEP(evento.target.value.replace("-", ""))
                                            }
                                        }}
                                        maxLength={9}
                                        type="text"
                                        className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-1 focus:ring-verde"
                                    />
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Endereço</label>
                                        <input ref={enderecoREF} type="text" required className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-1 focus:ring-verde" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Número</label>
                                        <input ref={numeroREF} type="text" required className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-1 focus:ring-verde" />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Complemento</label>
                                        <input ref={complementoREF} type="text" className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-1 focus:ring-verde" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Bairro</label>
                                        <input ref={bairroREF} type="text" required className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-1 focus:ring-verde" />
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
                                            className="w-full border border-gray-300 rounded-md h-12 focus:outline-none focus:ring-1 focus:ring-verde" >
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
                                                onClick={() => {
                                                    setFreteSelecionado(frete.id)
                                                    setPreferenceId(null)
                                                }}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <input
                                                        id={`frete-${frete.id}`}
                                                        name="freteEscolhido"
                                                        type="radio"
                                                        className="w-5 h-5 accent-verde"
                                                        checked={freteSelecionado === frete.id}
                                                        onChange={() => {
                                                            setFreteSelecionado(frete.id)
                                                            setPreferenceId(null)
                                                        }}
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

                                <button
                                    type="submit"
                                    disabled={criandoPagamento}
                                    className="w-full bg-verde text-white py-3 rounded-md mt-4 hover:bg-verde transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {criandoPagamento
                                        ? "Preparando pagamento..."
                                        : "Ir para o pagamento"}
                                </button>
                            </form>
                        ) : (
                            <div className="rounded-md border border-dashed border-slate-300 p-8 text-center text-slate-500">Preencha seus dados</div>
                        )
                    }


                </div>
                <div className="bg-white mb-4 p-4 rounded">
                    <div className="flex items-center mb-4">
                        {/* <div className="flex items-center justify-center w-8 h-8 rounded-full bg-verde text-white font-semibold mr-3">
                            3
                        </div> */}
                        <h2 className="text-2xl font-serif text-verde">Pagamento</h2>
                    </div>
                    {preferenceId ? (
                        <>
                            <Payment
                                initialization={{
                                    amount: total,
                                    preferenceId,
                                }}
                                customization={{
                                    paymentMethods: {
                                        ticket: "all",
                                        bankTransfer: "all",
                                        creditCard: "all",
                                        prepaidCard: "all",
                                        debitCard: "all",
                                        mercadoPago: "all",
                                    },
                                }}
                                onSubmit={onSubmit}
                                onReady={onReady}
                                onError={onError}
                            />
                            {showSuccessModal && (
                                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-6">
                                    <Confetti
                                        width={windowSize.width}
                                        height={windowSize.height}
                                        numberOfPieces={300}
                                        recycle={false}
                                    />
                                    <div className="relative w-full max-w-lg rounded-3xl bg-white p-8 shadow-2xl">
                                        <button
                                            type="button"
                                            onClick={() => setShowSuccessModal(false)}
                                            className="absolute right-4 top-4 text-slate-500 hover:text-slate-900 cursor-pointer"
                                        >
                                            Fechar
                                        </button>
                                        <div className="text-center">
                                            <h2 className="text-3xl font-serif text-verde mb-3">Parabéns!</h2>
                                            <p className="text-slate-600 mb-6">Seu pagamento foi aprovado e sua compra está confirmada.</p>
                                            <button
                                                type="button"
                                                onClick={handleIrParaPedidos}
                                                className="inline-flex items-center justify-center rounded-md bg-verde px-6 py-3 text-white transition hover:bg-verde/70 cursor-pointer"
                                            >
                                                Ir para meus pedidos
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="rounded-md border border-dashed border-slate-300 p-8 text-center text-slate-500">
                            Escolha uma forma de entrega para liberar o pagamento.
                        </div>
                    )}
                </div>
            </div>

            <div className="sticky lg:top-32 top-[30px] bg-white p-4 rounded">
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