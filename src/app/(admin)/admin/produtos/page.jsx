"use client";
import { useContext, useState } from "react";
import {
  useBuscarProdutos,
  useCriarProduto,
  useDeletarProduto,
  useEditarProduto,
} from "@/hooks/produtoHooks";
import { Button, Drawer, Form, Input, InputNumber, Popconfirm, Select, Table } from "antd";
import { BiPencil, BiTrash } from "react-icons/bi";
import { AntContext } from "@/contexts/AntContext";
import { useBuscarCategorias } from "@/hooks/categoriaHooks";

const AdminProduto = () => {
  const { data: produtos } = useBuscarProdutos();
  const { data: categorias, isFetched: categoriasListadas } = useBuscarCategorias();
  const [drawerCriar, setDrawerCriar] = useState(false);
  const [drawerEditar, setDrawerEditar] = useState(false);
  const { mutateAsync: criarProduto } = useCriarProduto();
  const { mutateAsync: editarProduto } = useEditarProduto();
  const { mutateAsync: deletarProduto } = useDeletarProduto();
  const { api } = useContext(AntContext);
  const [formEditar] = Form.useForm();

  function criar(dados) {
    criarProduto(dados, {
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
    editarProduto(dados, {
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
    deletarProduto(id, {
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
      <div className="flex items-center justify-between">
        <h2>Produtos</h2>
        <Button type="primary" onClick={() => setDrawerCriar(true)}>
          Novo produto
        </Button>
      </div>
      <Table dataSource={produtos || []} rowKey={"id"}>
        <Table.Column dataIndex={"id"} title={"id"} key={"id"} />
        <Table.Column dataIndex={"nome"} title={"nome"} key={"nome"} />
        <Table.Column dataIndex={"valor"} title={"valor"} key={"valor"} />
        <Table.Column dataIndex={"estoque"} title={"estoque"} key={"estoque"} />
        <Table.Column
          className="w-[100px]"
          title="ações"
          render={(_, produto) => (
            <div className="flex gap-3">
              <Button
                icon={<BiPencil />}
                onClick={() => {
                  formEditar.setFieldsValue({
                    id: produto.id,
                    nome: produto.nome,
                    descricao: produto.descricao,
                    tamanho: produto.tamanho,
                    cor: produto.cor,
                    valor: produto.valor,
                    estoque: produto.estoque,
                    id_categoria: produto.id_categoria,
                    desconto: produto.desconto,
                  });
                  setDrawerEditar(true);
                }}
              />
              <Popconfirm
                title="Aviso"
                description="Deseja apagar esse registro?"
                onConfirm={() => deletar(produto.id)}
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
        <Form layout="vertical" defaultValue={{tamanho: "PP"}} onFinish={criar}>
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

          <Form.Item
            label={"Tamanho"}
            name={"tamanho"}
            rules={[{ required: true, message: "Campo obrigatório" }]}
          >
            <Select
              options={[
                {
                  value: "PP",
                  label: "PP",
                },
                {
                  value: "P",
                  label: "P",
                },
                {
                  value: "M",
                  label: "M",
                },
                {
                  value: "G",
                  label: "G",
                },
                {
                  value: "GG",
                  label: "GG",
                },
              ]}
            />
          </Form.Item>

          <Form.Item
            label={"Cor"}
            name={"cor"}
            rules={[{ required: true, message: "Campo obrigatório" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label={"Valor"}
            name={"valor"}
            rules={[{ required: true, message: "Campo obrigatório" }]}
          >
            <InputNumber style={{ width: "100% !important" }}/>
          </Form.Item>

          <Form.Item
            label={"Estoque"}
            name={"estoque"}
            rules={[{ required: true, message: "Campo obrigatório" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label={"Categoria"}
            name={"id_categoria"}
            rules={[{ required: true, message: "Campo obrigatório" }]}
          >
            <Select
                options={categoriasListadas && categorias.map(categoria => {
                    return{
                        value: categoria.id,
                        label: categoria.nome
                    }
                }) || []}
            />
          </Form.Item>

          <Form.Item label={"Desconto"} name={"desconto"}>
            <InputNumber className="w-full!"/>
          </Form.Item>

          <Button type="primary" htmlType="submit">
            Criar
          </Button>
        </Form>
      </Drawer>

      <Drawer open={drawerEditar} onClose={() => setDrawerEditar(false)}>
        <Form layout="vertical" defaultValue={{tamanho: "PP"}} form={formEditar} onFinish={editar}>
          <Form.Item 
            hidden
            name={"id"}
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

          <Form.Item
            label={"Tamanho"}
            name={"tamanho"}
            rules={[{ required: true, message: "Campo obrigatório" }]}
          >
            <Select
              options={[
                {
                  value: "PP",
                  label: "PP",
                },
                {
                  value: "P",
                  label: "P",
                },
                {
                  value: "M",
                  label: "M",
                },
                {
                  value: "G",
                  label: "G",
                },
                {
                  value: "GG",
                  label: "GG",
                },
              ]}
            />
          </Form.Item>

          <Form.Item
            label={"Cor"}
            name={"cor"}
            rules={[{ required: true, message: "Campo obrigatório" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label={"Valor"}
            name={"valor"}
            rules={[{ required: true, message: "Campo obrigatório" }]}
          >
            <InputNumber className="w-full!"/>
          </Form.Item>

          <Form.Item
            label={"Estoque"}
            name={"estoque"}
            rules={[{ required: true, message: "Campo obrigatório" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label={"Categoria"}
            name={"id_categoria"}
            rules={[{ required: true, message: "Campo obrigatório" }]}
          >
            <Select
                options={categoriasListadas && categorias.map(categoria => {
                    return{
                        value: categoria.id,
                        label: categoria.nome
                    }
                }) || []}
            />
          </Form.Item>

          <Form.Item label={"Desconto"} name={"desconto"}>
            <InputNumber className="w-full!"/>
          </Form.Item>

          <Button type="primary" htmlType="submit">
            Editar
          </Button>
        </Form>
      </Drawer>
    </>
  );
};

export default AdminProduto;
