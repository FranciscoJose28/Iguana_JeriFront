import ProdutosContent from "@/components/ProdutosContent";
import { Suspense } from "react";

export default function ProdutosPage() {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <ProdutosContent />
    </Suspense>
  );
}