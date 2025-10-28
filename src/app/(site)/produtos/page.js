"use client"
import Image from "next/image";
const ProdutoDetalhe = () => {
    return (
        <div>
            <div></div>
            <div>
                <Image src={produto1} alt="foto do produto"/>
            </div>
            <div>
                <Image src={produto1} alt="foto do produto"/>
                <Image src={produto1} alt="foto do produto"/>
            </div>
        </div>
    );
}
 
export default ProdutoDetalhe;