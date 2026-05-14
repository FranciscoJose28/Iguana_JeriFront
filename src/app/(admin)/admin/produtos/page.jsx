"use client";
import { useContext, useState } from "react";
import {
  useBuscarProdutos,
  useCriarImagem,
  useCriarProduto,
  useDeletarImagem,
  useDeletarProduto,
  useEditarProduto,
} from "@/hooks/produtoHooks";
import {
  Button,
  Drawer,
  Form,
  Input,
  InputNumber,
  Popconfirm,
  Select,
  Table,
} from "antd";
import {
  BiImageAdd,
  BiPencil,
  BiShow,
  BiTrash,
  BiUpload,
  BiX,
} from "react-icons/bi";
import { AntContext } from "@/contexts/AntContext";
import { useBuscarCategorias } from "@/hooks/categoriaHooks";

const AdminProduto = () => {
  const { data: produtos } = useBuscarProdutos();
  const { data: categorias, isFetched: categoriasListadas } =
    useBuscarCategorias();
  const [drawerCriar, setDrawerCriar] = useState(false);
  const [drawerEditar, setDrawerEditar] = useState(false);
  const [drawerImagem, setDrawerImagem] = useState(false);
  const { mutateAsync: criarProduto } = useCriarProduto();
  const { mutateAsync: editarProduto } = useEditarProduto();
  const { mutateAsync: deletarProduto } = useDeletarProduto();
  const { mutateAsync: criarImagem } = useCriarImagem();
  const { mutateAsync: deletarImagem } = useDeletarImagem();
  const { api } = useContext(AntContext);
  const [formEditar] = Form.useForm();
  const [formImagem] = Form.useForm();
  const [produtoSelecionado, setProdutoSelecionado] = useState(null);

  function criar(dados) {
    dados.tamanho = dados.tamanho.toString();
    dados.cor = dados.cores.toString();
    delete dados.cores;
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
    dados.tamanho = dados.tamanho.toString();
    dados.cor = dados.cores.toString();
    delete dados.cores;
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

  function adicionarImagem(dados) {
    criarImagem(dados, {
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

  function removerImagem(id) {
    deletarImagem(id, {
      onSuccess: (resposta) => {
        api[resposta.tipo]({
          description: resposta.mensagem,
        });
      },
      onError: (resposta) => {
        api[resposta.tipo]({
          description: resposta.mensagem,
        });
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
                icon={<BiImageAdd />}
                onClick={() => {
                  formImagem.setFieldValue("id_produto", produto.id);
                  setDrawerImagem(true);
                  setProdutoSelecionado(produto);
                }}
              />
              <Button
                icon={<BiPencil />}
                onClick={() => {
                  formEditar.setFieldsValue({
                    id: produto.id,
                    nome: produto.nome,
                    descricao: produto.descricao,
                    tamanho: produto.tamanho.split(","),
                    peso: produto.peso,
                    cores: produto.cor ? produto.cor.split(",") : [],
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
        <Form
          layout="vertical"
          defaultValue={{ tamanho: "PP" }}
          onFinish={criar}
        >
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
              mode="multiple"
              allowClear
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
            label={"Peso"}
            name={"peso"}
            rules={[{ required: true, message: "Campo obrigatório" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item label="cores" required>
            <Form.List name="cores">
              {(fields, { add, remove }) => (
                <>
                  {fields.map((field) => (
                    <div key={`c-${field.key}`} className="flex gap-3">
                      <Form.Item
                        key={field.key}
                        name={field.name}
                        fieldKey={field.fieldKey}
                        rules={[
                          { required: true, message: "Selecione uma cor" },
                        ]}
                      >
                        <Input
                          type="color"
                          className="w-9! h-9! p-0! border-0!"
                        />
                      </Form.Item>

                      <Button
                        onClick={() => remove(field.name)}
                        icon={<BiTrash />}
                      ></Button>
                    </div>
                  ))}

                  <Button type="dashed" onClick={() => add()}>
                    Adicionar cor
                  </Button>
                </>
              )}
            </Form.List>
          </Form.Item>

          <Form.Item
            label={"Valor"}
            name={"valor"}
            rules={[{ required: true, message: "Campo obrigatório" }]}
          >
            <InputNumber style={{ width: "100% !important" }} />
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
              options={
                (categoriasListadas &&
                  categorias.map((categoria) => {
                    return {
                      value: categoria.id,
                      label: categoria.nome,
                    };
                  })) ||
                []
              }
            />
          </Form.Item>

          <Form.Item label={"Desconto"} name={"desconto"}>
            <InputNumber className="w-full!" />
          </Form.Item>

          <Button type="primary" htmlType="submit">
            Criar
          </Button>
        </Form>
      </Drawer>

      <Drawer open={drawerEditar} onClose={() => setDrawerEditar(false)}>
        <Form
          layout="vertical"
          defaultValue={{ tamanho: "PP" }}
          form={formEditar}
          onFinish={editar}
        >
          <Form.Item hidden name={"id"}>
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
              mode="multiple"
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
            label={"Peso"}
            name={"peso"}
            rules={[{ required: true, message: "Campo obrigatório" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item label="cores" required>
            <Form.List name="cores">
              {(fields, { add, remove }) => (
                <>
                  {fields.map((field) => (
                    <div key={`e-${field.key}`} className="flex gap-3">
                      <Form.Item
                        key={field.key}
                        name={field.name}
                        fieldKey={field.fieldKey}
                        rules={[
                          { required: true, message: "Selecione uma cor" },
                        ]}
                      >
                        <Input
                          type="color"
                          className="w-9! h-9! p-0! border-0!"
                        />
                      </Form.Item>

                      <Button
                        onClick={() => remove(field.name)}
                        icon={<BiTrash />}
                      ></Button>
                    </div>
                  ))}

                  <Button type="dashed" onClick={() => add()}>
                    Adicionar cor
                  </Button>
                </>
              )}
            </Form.List>
          </Form.Item>

          <Form.Item
            label={"Valor"}
            name={"valor"}
            rules={[{ required: true, message: "Campo obrigatório" }]}
          >
            <InputNumber className="w-full!" />
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
              options={
                (categoriasListadas &&
                  categorias.map((categoria) => {
                    return {
                      value: categoria.id,
                      label: categoria.nome,
                    };
                  })) ||
                []
              }
            />
          </Form.Item>

          <Form.Item label={"Desconto"} name={"desconto"}>
            <InputNumber className="w-full!" />
          </Form.Item>

          <Button type="primary" htmlType="submit">
            Editar
          </Button>
        </Form>
      </Drawer>

      <Drawer open={drawerImagem} onClose={() => setDrawerImagem(false)}>
        <div className="grid grid-cols-2 gap-4">
          {produtoSelecionado &&
            produtoSelecionado.produto_imagem.map((img) => (
              <div
                key={img.id}
                className="p-3 rounded border border-slate-300 mb-4 "
              >
                <div className="flex justify-end">
                  <Popconfirm
                    title="Aviso!"
                    description="Deseja realmente apagar essa imagem?"
                    okText="Sim"
                    cancelText="Não"
                    onConfirm={() => {
                      removerImagem(img.id);
                    }}
                  >
                    <BiX className="text-2xl cursor-pointer" />
                  </Popconfirm>
                </div>
                <img src={img.imagem} alt="" className="w-full" />
              </div>
            ))}
        </div>

        <Form
          layout="vertical"
          defaultValue={{ tamanho: "PP" }}
          form={formImagem}
          encType="multipart/form-data"
          onFinish={adicionarImagem}
        >
          <Form.Item hidden name={"id_produto"}>
            <Input />
          </Form.Item>
          <Form.Item
            label={"Imagem"}
            name={"imagem"}
            rules={[{ required: true, message: "Campo obrigatório" }]}
            valuePropName="fileList"
            getValueFromEvent={(e) => {
              if (Array.isArray(e)) {
                return e;
              }
              return e?.target?.files?.[0];
            }}
          >
            <Input type="file" />
          </Form.Item>

          <Button type="primary" htmlType="submit">
            Adicionar
          </Button>
        </Form>
      </Drawer>
    </>
  );
};

export default AdminProduto;
