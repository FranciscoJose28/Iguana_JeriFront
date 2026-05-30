"use client"
import { Button, Form, Input } from "antd";
import { useEffect, useState } from "react";
import { BiSolidLock } from "react-icons/bi";

const MeuPerfil = () => {
    const [editar, setEditar] = useState(true);
    // const [usuario, setUsuario] = useState(null);
    const [token, setToken] = useState(null);
    const [ formEditar ] = Form.useForm()

    useEffect(() => {
            const t = sessionStorage.getItem("token");
            const u = sessionStorage.getItem("usuario");
            setToken(t)
            let usuario = JSON.parse(u)
            console.log(usuario);
            
            formEditar.setFieldsValue({
                    id: usuario.id,
                    nome: usuario.nome,
                    sobrenome: usuario.sobrenome,
                    email: usuario.email,
                    cpf: usuario.cpf,
                    telefone: usuario.telefone,
                    data_nascimento: usuario.data_nascimento
                })
        }, [])

    return (
        <div>
            <h1 className="text-2xl mb-5">Dados Pessoais</h1>
            <div className="bg-white rounded p-5">
                <Form layout="vertical" className="w-120" form={formEditar}>
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
                        <Button type="primary" className="w-full" onClick={() => setEditar(false)}>Editar informações</Button>
                        {
                            editar ? null : <Button type="primary" className="w-full" onClick={() => setEditar(true)}>Cancelar</Button>
                        }

                    </div>



                </Form>
            </div>
        </div>
    );
}

export default MeuPerfil;