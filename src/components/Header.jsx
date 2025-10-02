import { BiSearch, BiShoppingBag, BiSolidUser } from "react-icons/bi";
import Logo from "../assets/Logo.png";
import LogoMenor from "../assets/LogoMenor.png"
import Image from 'next/image'

const Header = () => {
    return ( 
        <header className="relative items-center w-full border-b border-black/15 flex justify-between px-15 py-7">
            <nav>
                <ul className="flex gap-6 *:border-b *:border-transparent *:duration-200 *:hover:border-black">
                    <li>
                        <a href="/">Início</a>
                    </li>
                    <li>
                        <a href="/">Biquínis</a>
                    </li>
                    <li>
                        <a href="/">Cangas</a>
                    </li>
                    <li>
                        <a href="/">Maiôs</a>
                    </li>
                </ul>
            </nav>
            <div className="absolute top-1/2 left-1/2 -translate-1/2">
                <Image className="w-[50px]" src={LogoMenor} alt="Iguana Jeri" />
            </div>
            <div className="flex gap-4 items-center">
                <div className="flex items-center">
                    <input className="h-[30px] border-b focus:outline-0 focus:border-verde duration-200" placeholder="Pesquisar" type="text" /> 
                    <BiSearch/>   
                </div>
                <a href="/login">
                    <BiSolidUser />
                </a>
                <BiShoppingBag />
            </div>
        </header>
    );
}
 
export default Header;