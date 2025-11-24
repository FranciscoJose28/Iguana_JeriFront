import Image from "next/image"
import c1 from "@/assets/icon-americanexpress.webp"
import c2 from "@/assets/icon-banco-do-brasil.webp"
import c3 from "@/assets/icon-bradesco.webp"
import c4 from "@/assets/icon-diners.webp"
import c5 from "@/assets/icon-hipercard.webp"
import c6 from "@/assets/icon-itau.webp"
import c7 from "@/assets/icon-mastercard.webp"
import c8 from "@/assets/icon-p1.webp"
import c9 from "@/assets/icon-paypal.webp"
import c10 from "@/assets/icon-pix.webp"
import c11 from "@/assets/icon-visa.webp"

const Footer = () => {
    return (
        <footer className=" bg-black text-white p-30">
            <div className="grid grid-cols-3 gap-10">
                <div>
                    <h3 className="text-sm font-bold tracking-widest mb-4">CONTA</h3>
                    <ul className="space-y-3 text-gray-300 text-sm">
                        <li><a href="/login" className="hover:font-bold">Área do cliente</a></li>
                        <li><a href="" className="hover:text-white">Wishlist</a></li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-sm font-bold tracking-widest mb-4">ATENDIMENTO</h3>
                    <ul className="space-y-3 text-gray-300 text-sm">
                        <li><a href="" className="hover:text-white">Compra Segura</a></li>
                        <li><a href="" className="hover:text-white">Entrega e Frete</a></li>
                        <li><a href="" className="hover:text-white">Trocas e Devoluções</a></li>
                        <li><a href="" className="hover:text-white">Política de Privacidade</a></li>
                        <li><a href="" className="hover:text-white">Compre pelo Whatsapp</a></li>
                    </ul>
                </div>

                {/* <div>
                    <h3 className="text-sm font-bold tracking-widest mb-4">MINHA CONTA</h3>
                    <ul className="space-y-3 text-gray-300 text-sm">
                        <li><a href="" className="hover:text-white">Meu perfil</a></li>
                        <li><a href="" className="hover:text-white">Meus pedidos</a></li>
                    </ul>
                </div> */}

                <div>
                    <h3 className="text-sm font-bold tracking-widest mb-4">Formas de Pagamento</h3>
                    <div className="flex flex-wrap gap-2 *:bg-white *:p-1 *:rounded *:object-contain">
                        <Image src={c1} alt="" />
                        <Image src={c2} alt="" />
                        <Image src={c3} alt="" />
                        <Image src={c4} alt="" />
                        <Image src={c5} alt="" />
                        <Image src={c6} alt="" />
                        <Image src={c7} alt="" />
                        <Image src={c8} alt="" />
                        <Image src={c9} alt="" />
                        <Image src={c11} alt="" />
                        <Image src={c10} alt="" />
                    </div>
                </div>
            </div>
        </footer>
    );
}
 
export default Footer;