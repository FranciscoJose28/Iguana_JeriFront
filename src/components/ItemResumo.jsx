"use client";

const ItemResumo = ({
  id,
  produto_imagem,
  nome,
  valor,
  tamanho,
  cor,
  estoque,
  quantidade,
}) => {
  return (
    <div className="flex mb-4 gap-3">
      <div>
        <img width={70} src={produto_imagem[0].imagem} alt={nome} />
      </div>
      <div className="flex-1">
        <div className="flex justify-between">
          <strong className="font-medium text-sm line-clamp-1">{nome}</strong>
        </div>
        <h6 className="text-sm mb-1">R$ {valor.toFixed(2)}</h6>
        <div className="text-xs font-extralight mb-1 flex items-center">
          Cor:
          <span
            className="inline-block w-4 h-4 ml-2 rounded"
            style={{ backgroundColor: cor || "transparent" }}
          ></span>
        </div>
        <div className="text-xs font-extralight">Tamanho: {tamanho}</div>
      </div>
    </div>
  );
};

export default ItemResumo;
