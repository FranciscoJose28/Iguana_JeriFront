"use client"
import CarrinhoProvider from "../../contexts/CarrinhoContext";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

const SiteLayout = ({ children }) => {
    const [queryClient] = useState(() => new QueryClient())
    return (
        <>
            <QueryClientProvider client={queryClient}>
                <CarrinhoProvider>
                    <Header />
                    <main>{children}</main>
                    <Footer />
                </CarrinhoProvider>
            </QueryClientProvider>
        </>
    );
}

export default SiteLayout;