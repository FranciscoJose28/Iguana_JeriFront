import CarrinhoProvider from "../../contexts/CarrinhoContext";
import Footer from "../../components/Footer";
import Header from "../../components/Header";

const SiteLayout = ({ children }) => {
    return (
        <>
            <CarrinhoProvider>
                <Header />
                {children}
                <Footer />
            </CarrinhoProvider>
        </>
    );
}

export default SiteLayout;