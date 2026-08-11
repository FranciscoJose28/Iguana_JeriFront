"use client"
import { useBuscarPedidos } from "@/hooks/pedidoHooks";
import { Table } from "antd";
import { useEffect, useState } from "react";

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
            >
                <Table.Column dataIndex={"status"} title="Status" rowKey="status" />
            </Table>
        </>
    );
}

export default MeusPedidos;