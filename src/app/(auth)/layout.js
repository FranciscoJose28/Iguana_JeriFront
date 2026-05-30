import Header from "@/components/Header";

export default function AuthLayout({ children }) {
    return (
        <>
            <Header />
            <main>{children}</main>
        </>
    );
}
