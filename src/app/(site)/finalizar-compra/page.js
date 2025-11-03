"use client"

const FinalizarCompra = () => {
    return (
        <div className="max-w-2xl mx-auto py-30">
            <div className="flex items-center mb-4">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-verde text-white font-semibold mr-3">
                    1
                </div>
                <h2 className="text-2xl font-serif text-verde">Seus Dados</h2>
            </div>

            <p className="text-gray-600 mb-6">
                Aqui, só o necessário. Usamos suas informações com todo cuidado — e apenas para realizar sua compra.
            </p>

            <form className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">E-mail</label>
                    <input type="email" className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-1 focus:ring-verde"/>
                </div>

                <div className="grid grid-cols-1 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Nome</label>
                        <input type="text" className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-1 focus:ring-verde"/>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Sobrenome</label>
                        <input type="text" className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-1 focus:ring-verde"/>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">CPF</label>
                        <input type="text" placeholder="999.999.999-99" className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-1 focus:ring-verde"/>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Telefone</label>
                        <input type="tel" placeholder="11 99999-9999" className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-1 focus:ring-verde"/>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Data de Nascimento</label>
                    <input type="text" placeholder="dd/mm/aaaa" className="w-full sm:w-1/2 border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-1 focus:ring-verde"/>
                </div>

                <div className="flex items-center gap-2 pt-2">
                    <input type="checkbox" id="promocoes" className="accent-verde" />
                    <label htmlFor="promocoes" className="text-sm text-gray-700">Quero receber e-mails com promoções.</label>
                </div>

                <button type="submit" className="w-full bg-verde text-white py-3 rounded-md mt-4 hover:bg-verde transition">
                    Ir para a Entrega
                </button>
            </form>
        </div>
    );
}

export default FinalizarCompra;