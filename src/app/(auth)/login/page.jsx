const Login = () => {
    return ( 
        <div className="flex justify-center items-center h-screen">
            <form className="w-[350px] border border-black/15 rounded-lg p-4">
                <h2 className="text-2xl text-center font-bold mb-6">Seja bem-vinda(o)</h2>
                <label className="block mb-1 text-xs font-bold">Email</label>
                <input className="w-full h-[40px] border border-black/15 pl-3 rounded mb-4" type="email" placeholder="email@email.com" required/>
                <label className="block mb-1 text-xs font-bold">Senha</label>
                <input className="w-full h-[40px] border border-black/15 pl-3 rounded mb-4" type="password" placeholder="********" required/>
                <a className="block text-center underline mb-4" href="/mudar-senha">Esqueceu sua senha?</a>
                <button className="w-full h-[40px] bg-black text-white font-bold rounded mb-4">Entrar</button>
                <p className="text-xs text-center">Não tem uma conta ainda? <a className="underline" href="/cadastro">Criar uma conta</a> </p>
            </form>
        </div>
     );
}
 
export default Login;