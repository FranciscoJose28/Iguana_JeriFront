import { useBuscarProdutos } from "../hooks/produtoHooks";
import produto1 from "../assets/produto1.jpg";
import produto2 from "../assets/produto2.jpg";
import produto3 from "../assets/produto3.jpg";
import produto4 from "../assets/produto4.jpg";
import Produto from "./Produto";

const Produtos = () => {
  // const Lista = [
  //   {
  //     id: 1,
  //     nome: "Maiô com Bojo Removível Corda Macramê Sapê MA0963BQ",
  //     descricao: "",
  //     tamanho: "",
  //     cor: "",
  //     valor: 10.0,
  //     estoque: 5,
  //     desconto: 0,
  //     categoria: "Biquíni",
  //     produto_imagem: [produto1],
  //   },
  //   {
  //     id: 2,
  //     nome: "produto2",
  //     descricao: "",
  //     tamanho: "",
  //     cor: "",
  //     valor: 20.0,
  //     estoque: 10,
  //     desconto: 0,
  //     categoria: "Biquíni",
  //     produto_imagem: [produto2],
  //   },
  //   {
  //     id: 3,
  //     nome: "produto3",
  //     descricao: "",
  //     tamanho: "",
  //     cor: "",
  //     valor: 10.0,
  //     estoque: 8,
  //     desconto: 0,
  //     categoria: "Biquíni",
  //     produto_imagem: [produto3],
  //   },
  //   {
  //     id: 4,
  //     nome: "produto4",
  //     descricao: "",
  //     tamanho: "",
  //     cor: "",
  //     valor: 10.0,
  //     estoque: 15,
  //     desconto: 0,
  //     categoria: "Biquíni",
  //     produto_imagem: [produto4],
  //   },
  // ];
  const {data: Lista, isFetched} = useBuscarProdutos()
  console.log(Lista);
  
  return (
    <>
      <h2 className="text-center text-2xl font-semibold mt-10">Novidades!</h2>
      <div className="grid grid-cols-4 gap-4 px-15 py-10">
        {/* {isFetched && Lista.map((produto) => (
          <Produto key={produto.id} {...produto} />
        ))} */}
      </div>
      ;
    </>
  );
};

export default Produtos;
