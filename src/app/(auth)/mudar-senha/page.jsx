const MudarSenha = () => {
    return ( 
        <div className="flex justify-center items-center h-screen">
            <form className="w-[350px] border border-black/15 rounded-lg p-4">
                <h2 className="text-2xl text-center font-bold mb-4">Mudar minha senha</h2>

                <p className="mb-8 text-sm">Vamos te enviar um e-mail para poder alterar a sua senha.</p>

                <label className="block mb-1 text-xs font-bold">Email</label>
                <input className="w-full h-[40px] border border-black/15 pl-3 rounded mb-4" type="email" placeholder="email@email.com" required/>

                <button className="w-full h-[40px] bg-black text-white font-bold rounded mb-4">Enviar e-mail</button>
            </form>
        </div>
     );
}
 
export default MudarSenha;