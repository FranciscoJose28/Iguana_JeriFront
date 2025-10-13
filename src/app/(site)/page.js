import Produtos from "../../components/Produtos";
import Banner from "../../components/Banner";
import Newsletter from "../../components/Newsletter";
import { ToastContainer } from 'react-toastify';
import Instagram from "../../components/Instagram";

const Inicio = () => {
    return (
        <>
            <Banner/>
            <Produtos/>
            <Newsletter/>
            <Instagram/>
            <ToastContainer/>
        </>
    );
}

export default Inicio;