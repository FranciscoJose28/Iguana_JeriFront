"use client";

import Menu from "@/components/Menu";
import AntProvider, { AntContext } from "@/contexts/AntContext";
import { API } from "@/services";
import { useContext, useEffect } from "react";

const AdminLayout = ({ children }) => {
  const { collapsed } = useContext(AntContext);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
  }, []);

  return (
    <div className="h-screen flex">
      <Menu />
      <div className={`flex-1 p-15 ${collapsed ? "pl-[140px]" : "pl-[280px]"}`}>
        {children}
      </div>
    </div>
  );
};

export default AdminLayout;
