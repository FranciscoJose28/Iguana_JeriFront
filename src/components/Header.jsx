import { BiShoppingBag, BiSolidUser } from "react-icons/bi";
const Header = () => {
    return ( 
        <header>
            <nav>
                <ul>
                    <li>
                        <a href="/">Início</a>
                    </li>
                </ul>
            </nav>
            <h1>Logo</h1>
            <div>
                <input type="text" />
                <BiSolidUser />
                <BiShoppingBag />
            </div>
        </header>
    );
}
 
export default Header;