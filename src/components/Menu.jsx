"use client";
import { useContext, useState } from "react";
import { Layout, Menu as AntMenu, Button } from "antd";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  AppstoreOutlined,
  ShoppingOutlined,
  TagsOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { AntContext } from "@/contexts/AntContext";

const { Sider } = Layout;

const Menu = () => {
  const { collapsed, setCollapsed } = useContext(AntContext);
  return (
    <Sider
      collapsible
      collapsed={collapsed}
      trigger={null}
      width={220}
      style={{
        background: "#fff",
        borderRight: "1px solid #f0f0f0",
        height: "100vh",
        position: "fixed",
        left: 0,
        top: 0,
        zIndex: 10,
      }}
    >
      <div
        style={{
          padding: "10px 16px",
          display: "flex",
          justifyContent: collapsed ? "center" : "flex-end",
          alignItems: "center",
        }}
      >
        <Button
          type="text"
          onClick={() => setCollapsed(!collapsed)}
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        />
      </div>

      <AntMenu
        mode="inline"
        defaultSelectedKeys={["produtos"]}
        inlineCollapsed={collapsed}
        items={[
          {
            key: "admin",
            icon: <AppstoreOutlined />,
            label: <Link href="/admin">Admin</Link>,
          },
          {
            key: "produtos",
            icon: <ShoppingOutlined />,
            label: <Link href="/admin/produtos">Produtos</Link>,
          },
          {
            key: "categorias",
            icon: <TagsOutlined />,
            label: <Link href="/admin/categorias">Categorias</Link>,
          },
        ]}
      />
    </Sider>
  );
};

export default Menu;
