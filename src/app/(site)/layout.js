import Footer from "../../components/Footer";
import Header from "../../components/Header";

const SiteLayout = ({ children }) => {
    return (
        <>
            <Header />
            {children}
            <Footer />
        </>
    );
}

export default SiteLayout;