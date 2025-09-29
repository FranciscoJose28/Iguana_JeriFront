const Cadastro = () => {
    return ( 
        <div className="flex justify-center items-center h-screen">
            <form className="w-[350px] border border-black/15 rounded-lg p-4">
                <h2 className="text-2xl text-center font-bold mb-6">Cadastre-se</h2>

                <label className="block mb-1 text-xs font-bold">Nome Completo</label>
                <input className="w-full h-[40px] border border-black/15 pl-3 rounded mb-4" type="text" placeholder="digite seu nome" required/>

                <label className="block mb-1 text-xs font-bold">Telefone (opcional)</label>
                <input className="w-full h-[40px] border border-black/15 pl-3 rounded mb-4" type="tel" placeholder="digite seu telefone"/>

                <label className="block mb-1 text-xs font-bold">Email</label>
                <input className="w-full h-[40px] border border-black/15 pl-3 rounded mb-4" type="email" placeholder="email@email.com" required/>

                <label className="block mb-1 text-xs font-bold">Senha</label>
                <input className="w-full h-[40px] border border-black/15 pl-3 rounded mb-4" type="password" placeholder="********" required/>

                <label className="block mb-1 text-xs font-bold">Confirmar senha</label>
                <input className="w-full h-[40px] border border-black/15 pl-3 rounded mb-4" type="password" placeholder="********" required/>

                <button className="w-full h-[40px] bg-black text-white font-bold rounded mb-4">Criar uma conta</button>

                <p className="text-xs text-center">Já possui uma conta? <a className="underline" href="/login">Faça login</a> </p>
            </form>
        </div>
     );
}
 
export default Cadastro;