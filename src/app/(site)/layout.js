"use client"
import '@ant-design/v5-patch-for-react-19';
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { API } from "@/services";
import { initMercadoPago } from "@mercadopago/sdk-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const SiteLayout = ({ children }) => {
    const router = useRouter();

    initMercadoPago('TEST-78e1deb5-3aa3-4508-96cc-b3fe9bde2c6a', {
        locale: "pt-BR",
    })
    useEffect(() => {
        const token = sessionStorage.getItem("token");
    
        API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      }, []);

    return (
        <>
            <Header />
            <main className='pt-22'>{children}</main>
            <Footer />
        </>
    );
}

export default SiteLayout;