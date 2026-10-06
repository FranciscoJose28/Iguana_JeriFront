"use client";

import { useContext, useEffect, useState } from "react";
import {
  Button,
  Drawer,
  Form,
  Image,
  Input,
  Popconfirm,
  Select,
  Table,
  Tag,
} from "antd";
import { AntContext } from "@/contexts/AntContext";
import { BiPencil, BiTrash } from "react-icons/bi";
import { useBuscarPedidos, useEditarPedidos } from "@/hookspedidoHooks";

const AdminPedidos = () => {
  const [status, setStatus] = useState(false);
  const [cliente, setCliente] = useState(false);
  const { data: pedidos, isFetching, refetch } = useBuscarPedidos(null, status, cliente);
  const [drawerEditar, setDrawerEditar] = useState(false);
  const { mutateAsync: editarPedido } = useEditarPedidos();
  const { api } = useContext(AntContext);
  const [formEditar] = Form.useForm();

  function editar(dados) {
    editarPedido(dados, {
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

  const formatarDataBrasileira = (data) => {
    if (!data) return "-";
    const date = new Date(data);
    return date.toLocaleDateString("pt-BR");
  };

  const ProdutosExpandidos = ({ produtos_pedido }) => {
    if (!produtos_pedido || produtos_pedido.length === 0) {
      return <p>Nenhum produto neste pedido</p>;
    }

    return (
      <>
        <div className="grid grid-cols-2 text-center p-3 bg-white">
          <div>
            <div className="flex items-center gap-1">
              <span className="text-xs font-semibold uppercase text-gray-500">
                Cliente:
              </span>
              <span className="text-base font-semibold">Francisco José</span>
            </div>

            <div className="flex items-center gap-1">
              <span className="text-xs font-semibold uppercase text-gray-500">
                Email:
              </span>
              <span className="text-base font-semibold ">
                francisco@gmail.com
              </span>
            </div>

            <div className="flex items-center gap-1">
              <span className="text-xs font-semibold uppercase text-gray-500">
                Telefone:
              </span>
              <span className="text-base font-semibold">(85) 99775-0528</span>
            </div>
          </div>

          <div>
            <div className="flex items-start gap-1">
              <span className="text-xs mt-1 font-semibold uppercase text-gray-500">
                Endereço:
              </span>
              <span className="text-base font-semibold text-left">
                Rua Mosenhor Otavio de Castro 184
                <br />
                Bairro de Fátima, Fortaleza, Ceará
              </span>
            </div>
          </div>
        </div>

        <Table dataSource={produtos_pedido} rowKey={(pedido) => pedido.id}>
          <Table.Column
            title="Imagem"
            key="imagem"
            render={(_, pedido) => (
              <Image
                src={pedido.produto.produto_imagem?.[0]?.imagem}
                alt={pedido.produto.nome}
                width={50}
              />
            )}
          />

          <Table.Column
            dataIndex={["produto", "nome"]}
            title="Nome"
            key="nome"
          />

          <Table.Column
            dataIndex="quantidade"
            title="Quantidade"
            key="quantidade"
          />

          <Table.Column
            title="Preço"
            key="preco"
            render={(_, pedido) =>
              `R$ ${(pedido.produto.valor * pedido.quantidade).toFixed(2)}`
            }
          />
        </Table>
      </>
    );
  };

  function statusCor(status) {
    switch (status) {
      case "Pendente":
        return <Tag color="gold">{status}</Tag>;

      case "Em separação":
        return <Tag color="grey">{status}</Tag>;

      case "Enviado":
        return <Tag color="blue">{status}</Tag>;

      case "Concluído":
        return <Tag color="green">{status}</Tag>;

      default:
        break;
    }
  }

  function filtrarPorStatus(statu) {
    if (Array.isArray(status)) {
      if (status.includes(statu)) {
        setStatus(status.filter((s) => s != statu));
      } else {
        setStatus([...status, statu]);
      }
    } else {
      setStatus([statu]);
    }
  }

  useEffect(() => {
    refetch();
  }, [status, cliente]);

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold text-xl text-verde">Pedidos</h2>
      </div>

      <div className="flex justify-between bg-white p-4 mb-4 rounded-lg">
        <div className="flex gap-6">
          <div className="flex gap-3 items-center">
            <input
              type="checkbox"
              onClick={() => filtrarPorStatus("Pendente")}
            />
            Pendente
          </div>
          <div className="flex gap-3 items-center">
            <input
              type="checkbox"
              onClick={() => filtrarPorStatus("Em separação")}
            />
            Em separação
          </div>
          <div className="flex gap-3 items-center">
            <input
              type="checkbox"
              onClick={() => filtrarPorStatus("Enviado")}
            />
            Enviado
          </div>
          <div className="flex gap-3 items-center">
            <input
              type="checkbox"
              onClick={() => filtrarPorStatus("Concluído")}
            />
            Concluído
          </div>
        </div>
        <input type="text" className="border h-10 pl-3 rounded" placeholder="Nome ou Email" onChange={setCliente}/>
      </div>

      <Table
        dataSource={pedidos}
        rowKey={"id"}
        loading={isFetching}
        expandable={{
          expandedRowRender: (record) => (
            <ProdutosExpandidos produtos_pedido={record.produtos_pedido} />
          ),
        }}
      >
        <Table.Column
          dataIndex={"status"}
          title="Status"
          rowKey="status"
          render={statusCor}
        />
        <Table.Column
          dataIndex={"data_pedido"}
          title="Data do pedido"
          rowKey="status"
          render={formatarDataBrasileira}
        />
        <Table.Column
          dataIndex={"data_envio"}
          title="Envio"
          rowKey="status"
          render={formatarDataBrasileira}
        />
        <Table.Column
          dataIndex={"data_entrega"}
          title="Entrega"
          rowKey="status"
          render={formatarDataBrasileira}
        />
        <Table.Column dataIndex={"valor"} title="Valor" rowKey="status" />
        <Table.Column
          dataIndex={"transportadora"}
          title="Transportadora"
          rowKey="status"
        />
        <Table.Column
          dataIndex={"valor_frete"}
          title="Frete"
          rowKey="valor_frete"
        />
        <Table.Column
          render={(_, linha) =>
            linha.produtos_pedido
              .reduce((total, item) => total + item.produto.valor, 0)
              .toFixed(2)
          }
          title="Total"
          rowKey="status"
        />
        <Table.Column
          title="Ações"
          render={(_, pedido) => (
            <div className="flex gap-3">
              <Button
                icon={<BiPencil />}
                onClick={() => {
                  formEditar.setFieldsValue({
                    id: pedido.id,
                    status: pedido.status,
                  });
                  setDrawerEditar(true);
                }}
              />
            </div>
          )}
        />
      </Table>

      <Drawer open={drawerEditar} onClose={() => setDrawerEditar(false)}>
        <Form layout="vertical" onFinish={editar} form={formEditar}>
          <Form.Item name={"id"} hidden>
            <Input />
          </Form.Item>
          <Form.Item
            label={"status"}
            name={"status"}
            rules={[{ required: true, message: "Campo obrigatório" }]}
          >
            <Select
              options={[
                {
                  label: "Pendente",
                  value: "Pendente",
                },
                {
                  label: "Em separação",
                  value: "Em separação",
                },
                {
                  label: "Enviado",
                  value: "Enviado",
                },
                {
                  label: "Concluído",
                  value: "Concluído",
                },
              ]}
            />
          </Form.Item>

          <Button type="primary" htmlType="submit">
            Editar
          </Button>
        </Form>
      </Drawer>
    </>
  );
};

export default AdminPedidos;
