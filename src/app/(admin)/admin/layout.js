"use client";

import Menu from "@/components/Menu";
import { AntContext } from "@/contexts/AntContext";
import { API } from "@/services";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const AdminLayout = ({ children }) => {
  const { collapsed } = useContext(AntContext);
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = sessionStorage.getItem("token");

    if (!token) {
      router.push("/login");
      return;
    }

    API.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    setLoading(false);
  }, []);

  if (loading) return null;

  return (
    <div className="h-screen flex">
      <Menu />
      <div
        className={`flex-1 p-15 ${
          collapsed ? "pl-[140px]" : "pl-[280px]"
        }`}
      >
        {children}
      </div>
    </div>
  );
};

export default AdminLayout;
