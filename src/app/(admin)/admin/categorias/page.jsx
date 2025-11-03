"use client";
import { useContext, useState } from "react";
import { Button, Drawer, Form, Input, Popconfirm, Table } from "antd";
import {
  useBuscarCategorias,
  useCriarCategoria,
  useDeletarCategoria,
  useEditarCategoria,
} from "@/hooks/categoriaHooks";
import { AntContext } from "@/contexts/AntContext";
import { BiPencil, BiTrash } from "react-icons/bi";

const AdminCategoria = () => {
  const { data: categorias } = useBuscarCategorias();
  const [drawerCriar, setDrawerCriar] = useState(false);
  const [drawerEditar, setDrawerEditar] = useState(false);
  const { mutateAsync: criarCategoria } = useCriarCategoria();
  const { mutateAsync: editarCategoria } = useEditarCategoria();
  const { mutateAsync: deletarCategoria } = useDeletarCategoria();
  const { api } = useContext(AntContext);
  const [ formEditar ] = Form.useForm()

  function criar(dados) {
    criarCategoria(dados, {
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
    editarCategoria(dados, {
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
    deletarCategoria(id, {
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
        <h2>Categorias</h2>
        <Button type="primary" onClick={() => setDrawerCriar(true)}>
          Nova categoria
        </Button>
      </div>
      <Table dataSource={categorias || []} rowKey={"id"}>
        <Table.Column
          className="w-[50px]"
          dataIndex={"id"}
          title={"id"}
          key={"id"}
        />
        <Table.Column dataIndex={"nome"} title={"nome"} key={"nome"} />
        <Table.Column
          className="w-[100px]"
          title="ações"
          render={(_, categoria) => (
            <div className="flex gap-3">
              <Button icon={<BiPencil />} onClick={() => {
                formEditar.setFieldsValue({
                    id: categoria.id,
                    nome: categoria.nome,
                    descricao: categoria.descricao
                })
                setDrawerEditar(true)
              }}/>
              <Popconfirm
                title="Aviso"
                description="Deseja apagar esse registro?"
                onConfirm={() => deletar(categoria.id)}
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
            label={"Descrição"}
            name={"descricao"}
            rules={[{ required: true, message: "Campo obrigatório" }]}
          >
            <Input.TextArea />
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
            label={"Descrição"}
            name={"descricao"}
            rules={[{ required: true, message: "Campo obrigatório" }]}
          >
            <Input.TextArea />
          </Form.Item>

          <Button type="primary" htmlType="submit">
            Editar
          </Button>
        </Form>
      </Drawer>
    </>
  );
};

export default AdminCategoria;
