import Produtos from "@/components/Produtos";
import Banner from "@/components/Banner";
import Newsletter from "@/components/Newsletter";
import { ToastContainer } from 'react-toastify';
import Instagram from "@/components/Instagram";
import { BiLogoWhatsapp } from "react-icons/bi";

const Inicio = () => {
    return (
        <>
            <Banner/>
            <Produtos/>
            <Instagram/>
            <Newsletter/>
            <div className="fixed right-4 bottom-4 ">
                <a href="https://wa.me/5585997750528?text=Hello%20world" target="_blank" className="">
                    <BiLogoWhatsapp className="w-15 h-15 bg-verde p-3 rounded-full animate-bounce text-white"/>
                </a>
            </div>
            <ToastContainer/>
        </>
    );
}

export default Inicio;