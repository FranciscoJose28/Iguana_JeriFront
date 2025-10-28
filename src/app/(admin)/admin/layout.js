import Menu from "../../../components/Menu";

const AdminLayout = ({children}) => {
    return (
        <div className="h-screen flex">
            <Menu/>
            <div className="flex-1 p-15">{children}</div>
        </div>
    );
}
 
export default AdminLayout;