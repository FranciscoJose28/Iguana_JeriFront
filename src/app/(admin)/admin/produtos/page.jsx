"use client"
import { useState } from "react";
import { useBuscarProdutos } from "../../../../hooks/produtoHooks";
import { Button, Drawer, Form, Input, Table } from "antd";

const AdminProduto = () => {
    const {data:produtos} = useBuscarProdutos()
    const [drawerCriar,setDrawerCriar] = useState(false)
    return (
        <>
            <div className="flex items-center justify-between">
                <h2>Produtos</h2>
                <Button type="primary" onClick={() => setDrawerCriar(true)}>Novo produto</Button>
            </div>
            <Table
                dataSource={produtos || []}
                rowKey={"id"}
            >
                <Table.Column
                    dataIndex={"id"}
                    title={"id"}
                    key={"id"}
                />
                <Table.Column
                    dataIndex={"nome"}
                    title={"nome"}
                    key={"nome"}
                />
                <Table.Column
                    dataIndex={"valor"}
                    title={"valor"}
                    key={"valor"}
                />
                <Table.Column
                    dataIndex={"estoque"}
                    title={"estoque"}
                    key={"estoque"}
                />
            </Table>
            <Drawer
                open={drawerCriar}
                onClose={() => setDrawerCriar(false)}
            >
                <Form
                    layout="vertical"
                >
                    <Form.Item 
                        label={"Nome"}
                        name={"nome"}
                        rules={[{required:true, message:"Campo obrigatório"}]}
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item 
                        label={"Descrição"}
                        name={"descricao"}
                        rules={[{required:true, message:"Campo obrigatório"}]}
                    >
                        <Input.TextArea/>
                    </Form.Item>

                    <Form.Item 
                        label={"Tamanho"}
                        name={"tamanho"}
                        rules={[{required:true, message:"Campo obrigatório"}]}
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item 
                        label={"Cor"}
                        name={"cor"}
                        rules={[{required:true, message:"Campo obrigatório"}]}
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item 
                        label={"Valor"}
                        name={"valor"}
                        rules={[{required:true, message:"Campo obrigatório"}]}
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item 
                        label={"Estoque"}
                        name={"estoque"}
                        rules={[{required:true, message:"Campo obrigatório"}]}
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item 
                        label={"Categoria"}
                        name={"id_categoria"}
                        rules={[{required:true, message:"Campo obrigatório"}]}
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item 
                        label={"Desconto"}
                        name={"desconto"}
                    >
                        <Input/>
                    </Form.Item>

                    <Button type="primary" htmlType="submit">Criar</Button>
                </Form>
            </Drawer>
        </>
    );
}
 
export default AdminProduto;