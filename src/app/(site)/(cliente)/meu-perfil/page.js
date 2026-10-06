"use client"
import { AntContext } from "@/contexts/AntContext";
import { useEditarCliente, useEditarEndereco } from "@/hooks/clientesHooks";
import { Button, Form, Input, notification } from "antd";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { BiSolidLock } from "react-icons/bi";

const MeuPerfil = () => {
    const [editar, setEditar] = useState(true);
    const [usuario, setUsuario] = useState(null);
    const [token, setToken] = useState(null);
    const [formEditar] = Form.useForm();
    const { mutateAsync: editarCliente } = useEditarCliente();
    const { mutateAsync: editarEndereco } = useEditarEndereco();
    const { api } = useContext(AntContext);
    const [formEndereco] = Form.useForm()


    function editarPerfil() {
        let dados = formEditar.getFieldsValue()
        editarCliente(dados, {
            onSuccess: (resposta) => {
                api[resposta.tipo]({
                    description: resposta.mensagem,
                });
                sessionStorage.setItem("usuario", JSON.stringify({ ...dados }))
                window.location.reload()
            },
            onError: (resposta) => {
                api[resposta.tipo]({
                    description: resposta.mensagem,
                });
            },
        });
    }

    function editarDados() {
        let dados = formEndereco.getFieldsValue()
        editarEndereco(dados, {
            onSuccess: (resposta) => {
                api[resposta.tipo]({
                    description: resposta.mensagem,
                });
                // sessionStorage.setItem("usuario", JSON.stringify({ ...dados }))
                // window.location.reload()
            },
            onError: (resposta) => {
                api[resposta.tipo]({
                    description: resposta.mensagem,
                });
            },
        });
    }

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

            formEndereco.setFieldValue("logradouro", response.logradouro);
            formEndereco.setFieldValue("bairro", response.bairro);
            formEndereco.setFieldValue("cidade", response.localidade);
            formEndereco.setFieldValue("estado", response.estado);
        }
        catch (error) {
            console.error("Erro ao buscar CEP:", error);
        }
    }

    useEffect(() => {
        const t = sessionStorage.getItem("token");
        const u = sessionStorage.getItem("usuario");

        setToken(t);

        const usuarioParseado = JSON.parse(u);
        setUsuario(usuarioParseado);

        formEditar.setFieldsValue({
            id: usuarioParseado.id,
            nome: usuarioParseado.nome,
            sobrenome: usuarioParseado.sobrenome,
            email: usuarioParseado.email,
            cpf: usuarioParseado.cpf,
            telefone: usuarioParseado.telefone,
            data_nascimento: usuarioParseado.data_nascimento
        });
        formEndereco.setFieldValue("id_cliente", usuarioParseado.id)
    }, []);

    return (
        <div className="mb-30">
            <h1 className="text-2xl mb-5">Dados Pessoais</h1>
            <div className="bg-white rounded p-5 mb-5">
                <Form layout="vertical" className="w-120" form={formEditar} >
                    <Form.Item name={"id"} hidden>
                        <Input />
                    </Form.Item>
                    <div className="flex gap-4 *:flex-1">
                        <Form.Item
                            label="Nome"
                            name="nome"
                        >
                            <Input disabled={editar} suffix={<BiSolidLock
                                style={{
                                    visibility: editar ? "visible" : "hidden",
                                }}
                            />} />
                        </Form.Item>
                        <Form.Item
                            label="Sobrenome"
                            name="sobrenome"
                        >
                            <Input disabled={editar} suffix={<BiSolidLock
                                style={{
                                    visibility: editar ? "visible" : "hidden",
                                }}
                            />} />
                        </Form.Item>

                    </div>

                    <Form.Item
                        label="Email"
                        name="email"
                    >
                        <Input disabled={editar} suffix={<BiSolidLock
                            style={{
                                visibility: editar ? "visible" : "hidden",
                            }}
                        />} />
                    </Form.Item>

                    <Form.Item
                        label="Senha"
                        name="senha"
                    >
                        <Input disabled={editar} suffix={<BiSolidLock
                            style={{
                                visibility: editar ? "visible" : "hidden",
                            }}
                        />} />
                    </Form.Item>

                    <div className="flex gap-4 *:flex-1">
                        <Form.Item
                            label="CPF"
                            name="cpf"
                        >
                            <Input disabled={editar} suffix={<BiSolidLock
                                style={{
                                    visibility: editar ? "visible" : "hidden",
                                }}
                            />} />
                        </Form.Item>

                        <Form.Item
                            label="Telefone"
                            name="telefone"
                        >
                            <Input disabled={editar} suffix={<BiSolidLock
                                style={{
                                    visibility: editar ? "visible" : "hidden",
                                }}
                            />} />
                        </Form.Item>

                    </div>


                    <Form.Item
                        className="w-1/2"
                        label="Data de nascimento"
                        name="data_nascimento"
                    >
                        <Input disabled={editar} suffix={<BiSolidLock
                            style={{
                                visibility: editar ? "visible" : "hidden",
                            }}
                        />} />
                    </Form.Item>

                    <div className="flex gap-3">
                        <Button type="primary" className="w-full" onClick={() => editar ? setEditar(false) : editarPerfil()}>Editar informações</Button>
                        {
                            editar ? null : <Button type="primary" className="w-full" onClick={() => {
                                setEditar(true)
                                formEditar.setFieldsValue({
                                    id: usuario.id,
                                    nome: usuario.nome,
                                    sobrenome: usuario.sobrenome,
                                    email: usuario.email,
                                    cpf: usuario.cpf,
                                    telefone: usuario.telefone,
                                    data_nascimento: usuario.data_nascimento
                                });
                            }}>Cancelar</Button>
                        }

                    </div>



                </Form>
            </div>

            <h1 className="text-2xl mb-5">Dados de endereço</h1>
            <div className="bg-white rounded p-5">
                <Form layout="vertical" className="w-120" form={formEndereco} >
                    <Form.Item name={"id_cliente"} hidden>
                        <Input />
                    </Form.Item>
                    <div className="flex gap-4 *:flex-1">
                        <Form.Item
                            label="CEP"
                            name="cep"
                            rules={[{required:true, message:"Campo obrigatório"}]}
                        >
                            <Input
                                placeholder="00000000"
                                disabled={editar}
                                suffix={<BiSolidLock
                                    style={{
                                        visibility: editar ? "visible" : "hidden",
                                    }}
                                />}
                                onKeyUp={(evento) => {
                                    let cep = evento.target.value;
                                    if (cep.length == 8) {
                                        if (/^\d{8}$/.test(cep)) {
                                            buscarCEP(cep.replace("-", ""))
                                        }
                                        else {
                                            notification.warning({
                                                description: "CEP inválido",
                                                placement: "bottomRight"
                                            })
                                        }
                                    }
                                }}
                                maxLength={9}
                            />
                        </Form.Item>
                    </div>

                    <Form.Item
                        label="Endereço"
                        name="logradouro"
                        rules={[{required:true, message:"Campo obrigatório"}]}
                    >
                        <Input disabled={editar} suffix={<BiSolidLock
                            style={{
                                visibility: editar ? "visible" : "hidden",
                            }}
                        />} />
                    </Form.Item>

                    <div className="flex gap-4 *:flex-1">
                        <Form.Item
                            label="Número"
                            name="numero"
                            rules={[{required:true, message:"Campo obrigatório"}]}
                        >
                            <Input disabled={editar} suffix={<BiSolidLock
                                style={{
                                    visibility: editar ? "visible" : "hidden",
                                }}
                            />} />
                        </Form.Item>
                        <Form.Item
                            label="Complemento"
                            name="complemento"
                        >
                            <Input disabled={editar} suffix={<BiSolidLock
                                style={{
                                    visibility: editar ? "visible" : "hidden",
                                }}
                            />} />
                        </Form.Item>
                    </div>

                    <Form.Item
                        label="Bairro"
                        name="bairro"
                        rules={[{required:true, message:"Campo obrigatório"}]}
                    >
                        <Input disabled={editar} suffix={<BiSolidLock
                            style={{
                                visibility: editar ? "visible" : "hidden",
                            }}
                        />} />
                    </Form.Item>

                    <Form.Item
                        label="Cidade"
                        name="cidade"
                        rules={[{required:true, message:"Campo obrigatório"}]}
                    >
                        <Input disabled={editar} suffix={<BiSolidLock
                            style={{
                                visibility: editar ? "visible" : "hidden",
                            }}
                        />} />
                    </Form.Item>

                    <div className="flex gap-4 *:flex-1">
                        <Form.Item
                            label="Estado"
                            name="estado"
                            rules={[{required:true, message:"Campo obrigatório"}]}
                        >
                            <Input disabled={editar} suffix={<BiSolidLock
                                style={{
                                    visibility: editar ? "visible" : "hidden",
                                }}
                            />} />
                        </Form.Item>

                    </div>

                    <div className="flex gap-3">
                        <Button type="primary" className="w-full" onClick={() => editar ? setEditar(false) : editarDados()}>Editar informações</Button>
                        {
                            editar ? null : <Button type="primary" className="w-full" onClick={() => {
                                setEditar(true)
                                formEditar.setFieldsValue({
                                    id: usuario.id,
                                    nome: usuario.nome,
                                    sobrenome: usuario.sobrenome,
                                    email: usuario.email,
                                    cpf: usuario.cpf,
                                    telefone: usuario.telefone,
                                    data_nascimento: usuario.data_nascimento
                                });
                            }}>Cancelar</Button>
                        }

                    </div>



                </Form>
            </div>
        </div>
    );
}

export default MeuPerfil;