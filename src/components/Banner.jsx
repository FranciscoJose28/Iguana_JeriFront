import Image from "next/image";
import banner from "../assets/banner.jpg"

const Banner = () => {
    return (
        <Image className="h-screen object-cover" src={banner} alt="banner1"/>
    );
}
 
export default Banner;