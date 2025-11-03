import Menu from "@/components/Menu";
import AntProvider from "@/contexts/AntContext";

const AdminLayout = ({children}) => {
    return (
        <AntProvider>
            <div className="h-screen flex">
                <Menu/>
                <div className="flex-1 p-15">{children}</div>
            </div>
        </AntProvider>
    );
}
 
export default AdminLayout;