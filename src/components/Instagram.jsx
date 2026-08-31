import Image from "next/image";
import instagram1 from "@/assets/instagram1.jpg"
import instagram2 from "@/assets/instagram2.jpg"
import instagram3 from "@/assets/instagram3.jpg"

const Instagram = () => {
    return (
        <div className="px-6 sm:px-30 py-10">
            <h1 className="text-[48px] sm:text-[80px] text-center text-slate-700 font-thin mb-7">Instagram</h1>
            {/* <h1 className="text-3xl font-bold mb-15">Instagram</h1> */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-0">
                <Image className="h-56 sm:h-[350px] object-cover rounded" src={instagram1} alt="foto do instagram1"/>
                <Image className="h-56 sm:h-[350px] object-cover rounded" src={instagram2} alt="foto do instagram2"/>
                <Image className="h-56 sm:h-[350px] object-cover rounded" src={instagram3} alt="foto do instagram3"/>
                <Image className="h-56 sm:h-[350px] object-cover rounded" src={instagram3} alt="foto do instagram3"/>
            </div>
            <div className="flex justify-center mt-10">
                <a href="https://www.instagram.com/iguanajeri" target="_blank" className="bg-verde text-white rounded px-15 py-2 text-2xl font-thin hover:bg-verde/70 duration-200 cursor-pointer">Veja mais</a>
            </div>
        </div>
    );
}
 
export default Instagram;