const Newsletter = () => {
    return (
        <div className="flex flex-col items-center justify-center pt-8">
            <h2 className="text-2xl font-semibold mb-3">Cadastre-se em nossa newsletter</h2>
            <div className="flex items-center gap-2">
                <input className="rounded border border-gray-300 px-3 py-2 w-[500px] outline-none text-sm" type="text" placeholder="Digite seu email..."/>
                <button className="bg-black text-white rounded px-4 py-2 text-sm font-medium hover:bg-verde duration-200 cursor-pointer">Enviar</button>
            </div>         
        </div>
    );
}
 
export default Newsletter;