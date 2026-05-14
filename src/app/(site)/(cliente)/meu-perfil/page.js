"use client"
import { Button, Form, Input } from "antd";

const MeuPerfil = () => {
    return (
        <div>
            <h1 className="text-2xl mb-5">Dados Pessoais</h1>
            <div className="bg-white rounded p-5">
                <Form layout="vertical" className="w-120">
                    <div className="flex gap-4 *:flex-1">
                        <Form.Item
                            label="Nome"
                            name="nome"
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Sobrenome"
                            name="sobrenome"
                        >
                            <Input />
                        </Form.Item>

                    </div>

                    <Form.Item
                        label="Email"
                        name="email"
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Senha"
                        name="senha"
                    >
                        <Input />
                    </Form.Item>

                    <div className="flex gap-4 *:flex-1">
                        <Form.Item
                            label="CPF"
                            name="cpf"
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Telefone"
                            name="telefone"
                        >
                            <Input />
                        </Form.Item>

                    </div>


                    <Form.Item
                        label="Data de nascimento"
                        name="data_nascimento"
                    >
                        <Input />
                    </Form.Item>

                    <Button type="primary" className="w-full">Editar informções</Button>
                </Form>
            </div>
        </div>
    );
}

export default MeuPerfil;