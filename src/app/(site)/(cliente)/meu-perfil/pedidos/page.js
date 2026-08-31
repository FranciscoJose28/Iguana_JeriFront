"use client"
import { useBuscarPedidos } from "@/hooks/pedidoHooks";
import { Image, Table } from "antd";
import { useEffect, useState } from "react";

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
                dataIndex={["produto", "valor"]}
                title="Preço"
                key="preco"
                render={(valor) => `R$ ${valor?.toFixed(2)}`}
            />
        </Table>
    );
};

const MeusPedidos = () => {
    const [usuario, setUsuario] = useState(null);
    const { data: pedidos, isFetching } = useBuscarPedidos(usuario?.id);

    useEffect(() => {
        if (typeof window === "undefined") return;

        const u = sessionStorage.getItem("usuario");

        if (u) {
            setUsuario(JSON.parse(u));
        }
    }, []);

    return (
        <>
            <Table
                dataSource={pedidos}
                rowKey={"id"}
                loading={isFetching}
                expandable={{
                    expandedRowRender: (record) => <ProdutosExpandidos produtos_pedido={record.produtos_pedido} />
                }}
            >
                <Table.Column dataIndex={"status"} title="Status" rowKey="status" />
                <Table.Column dataIndex={"data_pedido"} title="Data do pedido" rowKey="status" render={formatarDataBrasileira} />
                <Table.Column dataIndex={"data_envio"} title="Envio" rowKey="status" render={formatarDataBrasileira} />
                <Table.Column dataIndex={"data_entrega"} title="Entrega" rowKey="status" render={formatarDataBrasileira} />
                <Table.Column dataIndex={"valor"} title="Valor" rowKey="status" />
                <Table.Column dataIndex={"transportadora"} title="Transportadora" rowKey="status" />
                <Table.Column dataIndex={"total"} title="Total" rowKey="status" />
                <Table.Column dataIndex={"valor_frete"} title="Frete" rowKey="valor_frete" />
            </Table>
 
        </>
    );
}

export default MeusPedidos;