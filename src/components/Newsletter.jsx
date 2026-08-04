const Newsletter = () => {
    return (
        <div className="flex flex-col items-center justify-center py-28 px-30">
            <h2 className="text-2xl font-semibold text-slate-700 mb-10">Depoimentos</h2>
            <div className="grid grid-cols-3 gap-10 text-center *:text-slate-600">
                <div>
                    <p><em>"Comprei um biquíni e fiquei surpresa com a qualidade. O tecido é grosso, confortável e veste muito bem. A entrega chegou antes do prazo e o atendimento foi super atencioso. Com certeza vou comprar novamente"</em></p>
                    <h6 className="text-verde font-bold">Ana Paula</h6>
                </div>
                <div>
                    <p><em>"Estava com receio de comprar pela internet, mas deu tudo certo. As peças são exatamente como nas fotos, o acabamento é excelente e a modelagem valorizou muito o corpo."</em></p>
                    <h6 className="text-verde font-bold">Mayra Cavalcante</h6>        
                </div>
                <div>
                    <p><em>"Minha experiência foi ótima do início ao fim. O pedido chegou bem embalado, o tamanho ficou perfeito e a qualidade superou minhas expectativas. Dá para perceber o cuidado da loja com os clientes. Recomendo sem medo!"</em></p>
                    <h6 className="text-verde font-bold">Joana Andrade</h6>
                </div>
            </div>         
        </div>
    );
}
 
export default Newsletter;