const Cadastro = () => {
    return ( 
        <div className="flex justify-center items-center h-screen">
            <form className="w-[430px] rounded-lg p-4 mt-10">
                <h2 className="text-2xl text-center font-semibold mb-6 text-verde">Cadastre-se</h2>

                <label className="block mb-1 text-xs font-bold text-slate-700">Nome Completo</label>
                <input className="w-full h-10 border border-black/15 pl-3 rounded mb-4" type="text" placeholder="Digite seu nome" required/>

                <label className="block mb-1 text-xs font-bold text-slate-700">Telefone (opcional)</label>
                <input className="w-full h-10 border border-black/15 pl-3 rounded mb-4" type="tel" placeholder="Digite seu telefone"/>

                <label className="block mb-1 text-xs font-bold text-slate-700">Email</label>
                <input className="w-full h-10 border border-black/15 pl-3 rounded mb-4" type="email" placeholder="Email@email.com" required/>

                <label className="block mb-1 text-xs font-bold text-slate-700">Senha</label>
                <input className="w-full h-10 border border-black/15 pl-3 rounded mb-4" type="password" placeholder="********" required/>

                <label className="block mb-1 text-xs font-bold text-slate-700">Confirmar senha</label>
                <input className="w-full h-10 border border-black/15 pl-3 rounded mb-4" type="password" placeholder="********" required/>

                <button className="w-full h-10 bg-verde hover:bg-verde/70 duration-200 text-white font-bold rounded mb-4 cursor-pointer">Criar uma conta</button>

                <p className="text-xs text-center text-slate-500">Já possui uma conta? <a className="underline hover:text-verde" href="/login">Faça login</a> </p>
            </form>
        </div>
     );
}
 
export default Cadastro;