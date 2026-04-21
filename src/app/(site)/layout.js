"use client"
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { initMercadoPago } from "@mercadopago/sdk-react";

const SiteLayout = ({ children }) => {

    initMercadoPago('TEST-78e1deb5-3aa3-4508-96cc-b3fe9bde2c6a', {
        locale: "pt-BR",
    })

    return (
        <>
            <Header />
            <main>{children}</main>
            <Footer />
        </>
    );
}

export default SiteLayout;