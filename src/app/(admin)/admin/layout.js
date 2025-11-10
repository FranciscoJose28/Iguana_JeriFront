"use client"
import Menu from "@/components/Menu";
import AntProvider, { AntContext } from "@/contexts/AntContext";
import { API } from "@/services";
import { useContext } from "react";

const AdminLayout = ({children}) => {
    API.defaults.headers.common['Authorization'] = `Bearer ${sessionStorage.getItem("token")}`;
    const { collapsed } = useContext(AntContext);

    return (
        // <AntProvider>
            <div className="h-screen flex">
                <Menu/>
                <div className={`flex-1 p-15 ${collapsed ? "pl-[140px]" : "pl-[280px]"}`}>{children}</div>
            </div>
        // </AntProvider>
    );
}
 
export default AdminLayout;