import CarrinhoProvider from "../../contexts/CarrinhoContext";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "../../services";

const SiteLayout = ({ children }) => {
    return (
        <>
            <QueryClientProvider client={queryClient}>
                <CarrinhoProvider>
                    <Header />
                    {children}
                    <Footer />
                </CarrinhoProvider>
            </QueryClientProvider>
        </>
    );
}

export default SiteLayout;