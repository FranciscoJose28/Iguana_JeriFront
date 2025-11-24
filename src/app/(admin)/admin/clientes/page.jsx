"use client";
import { useContext, useState } from "react";
import { Button, Drawer, Form, Input, Popconfirm, Table } from "antd";
import {
  useBuscarClientes,
  useCriarCliente,
  useDeletarCliente,
  useEditarCliente,
} from "@/hooks/clientesHooks";
import { AntContext } from "@/contexts/AntContext";
import { BiPencil, BiTrash } from "react-icons/bi";

const AdminCliente = () => {
  const { data: clientes } = useBuscarClientes();
  const [drawerCriar, setDrawerCriar] = useState(false);
  const [drawerEditar, setDrawerEditar] = useState(false);
  const { mutateAsync: criarCliente } = useCriarCliente();
  const { mutateAsync: editarCliente } = useEditarCliente();
  const { mutateAsync: deletarCliente } = useDeletarCliente();
  const { api } = useContext(AntContext);
  const [ formEditar ] = Form.useForm()

  function criar(dados) {
    criarCliente(dados, {
      onSuccess: (resposta) => {
        api[resposta.tipo]({
          description: resposta.mensagem,
        });
        setDrawerCriar(false);
      },
      onError: (resposta) => {
        api[resposta.tipo]({
          description: resposta.mensagem,
        });
        setDrawerCriar(false);
      },
    });
  }

  function editar(dados) {
    editarCliente(dados, {
      onSuccess: (resposta) => {
        api[resposta.tipo]({
          description: resposta.mensagem,
        });
        setDrawerEditar(false);
      },
      onError: (resposta) => {
        api[resposta.tipo]({
          description: resposta.mensagem,
        });
        setDrawerEditar(false);
      },
    });
  }
  function deletar(id) {
    deletarCliente(id, {
      onSuccess: (resposta) => {
        api[resposta.tipo]({
          description: resposta.mensagem,
        });
        setDrawerCriar(false);
      },
      onError: (resposta) => {
        api[resposta.tipo]({
          description: resposta.mensagem,
        });
        setDrawerCriar(false);
      },
    });
  }
  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <h2>Clientes</h2>
        <Button type="primary" onClick={() => setDrawerCriar(true)}>
          Novo Cliente
        </Button>
      </div>
      <Table dataSource={clientes || []} rowKey={"id"}>
        <Table.Column
          className="w-[50px]"
          dataIndex={"id"}
          title={"id"}
          key={"id"}
        />
        <Table.Column dataIndex={"nome"} title={"nome"} key={"nome"} />
        <Table.Column dataIndex={"email"} title={"email"} key={"email"} />
        <Table.Column dataIndex={"telefone"} title={"telefone"} key={"telefone"} />
        <Table.Column dataIndex={"cpf"} title={"cpf"} key={"cpf"} />
        <Table.Column
          className="w-[100px]"
          title="ações"
          render={(_, cliente) => (
            <div className="flex gap-3">
              <Button icon={<BiPencil />} onClick={() => {
                formEditar.setFieldsValue({
                    ...cliente
                })
                setDrawerEditar(true)
              }}/>
              <Popconfirm
                title="Aviso"
                description="Deseja apagar esse registro?"
                onConfirm={() => deletar(cliente.id)}
                okText="Sim"
                cancelText="Não"
              >
                <Button icon={<BiTrash />} />
              </Popconfirm>
            </div>
          )}
        />
      </Table>
      <Drawer open={drawerCriar} onClose={() => setDrawerCriar(false)}>
        <Form layout="vertical" onFinish={criar}>
          <Form.Item
            label={"Nome"}
            name={"nome"}
            rules={[{ required: true, message: "Campo obrigatório" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label={"Email"}
            name={"email"}
            rules={[{ required: true, message: "Campo obrigatório" }]}
          >
            <Input.TextArea />
          </Form.Item>

          <Form.Item
            label={"Senha"}
            name={"senha"}
            rules={[{ required: true, message: "Campo obrigatório" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label={"Telefone"}
            name={"telefone"}
            rules={[{ required: true, message: "Campo obrigatório" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label={"Cpf"}
            name={"cpf"}
            rules={[{ required: true, message: "Campo obrigatório" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label={"Data de nascimento"}
            name={"data_nascimento"}
            rules={[{ required: true, message: "Campo obrigatório" }]}
          >
            <Input />
          </Form.Item>

          <Button type="primary" htmlType="submit">
            Criar
          </Button>
        </Form>
      </Drawer>
      <Drawer open={drawerEditar} onClose={() => setDrawerEditar(false)}>
        <Form layout="vertical" onFinish={editar} form={formEditar}>
          <Form.Item
            name={"id"}
            hidden
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={"Nome"}
            name={"nome"}
            rules={[{ required: true, message: "Campo obrigatório" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label={"Email"}
            name={"email"}
            rules={[{ required: true, message: "Campo obrigatório" }]}
          >
            <Input.TextArea />
          </Form.Item>

          <Form.Item
            label={"Senha"}
            name={"senha"}
            rules={[{ required: true, message: "Campo obrigatório" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label={"Telefone"}
            name={"telefone"}
            rules={[{ required: true, message: "Campo obrigatório" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label={"Cpf"}
            name={"cpf"}
            rules={[{ required: true, message: "Campo obrigatório" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label={"Data de nascimento"}
            name={"data_nascimento"}
            rules={[{ required: true, message: "Campo obrigatório" }]}
          >
            <Input />
          </Form.Item>

          <Button type="primary" htmlType="submit">
            Editar
          </Button>
        </Form>
      </Drawer>
    </>
  );
};

export default AdminCliente;