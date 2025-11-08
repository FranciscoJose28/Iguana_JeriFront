"use client"
import Menu from "@/components/Menu";
import AntProvider from "@/contexts/AntContext";
import { API } from "@/services";

const AdminLayout = ({children}) => {
    API.defaults.headers.common['Authorization'] = `Bearer ${sessionStorage.getItem("token")}`;

    return (
        // <AntProvider>
            <div className="h-screen flex">
                <Menu/>
                <div className="flex-1 p-15">{children}</div>
            </div>
        // </AntProvider>
    );
}
 
export default AdminLayout;