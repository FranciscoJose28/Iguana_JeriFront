const MudarSenha = () => {
    return ( 
        <div className="flex justify-center items-center h-screen">
            <form className="w-[410px] rounded-lg p-4">
                <h2 className="text-2xl text-center text-verde font-bold mb-4">Mudar minha senha</h2>

                <p className="mb-8 text-sm text-slate-500 font-semibold">Vamos te enviar um e-mail para poder alterar a sua senha.</p>

                <label className="block mb-1 text-xs text-slate-700 font-bold">Email</label>
                <input className="w-full h-10 border border-black/15 pl-3 rounded mb-4" type="email" placeholder="Email@email.com" required/>

                <button className="w-full h-10 bg-verde hover:bg-verde/70 duration-200 text-white font-bold rounded mb-4 cursor-pointer mt-5">Enviar e-mail</button>
            </form>
        </div>
     );
}
 
export default MudarSenha;