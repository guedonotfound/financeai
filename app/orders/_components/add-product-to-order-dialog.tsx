import { useState, useMemo } from "react";
import { Input } from "@/app/_components/ui/input";
import { Button } from "@/app/_components/ui/button";
import { Card } from "@/app/_components/ui/card";
import { Product } from "@prisma/client";

interface AddProductToOrderDialogProps {
  products: Product[];
  onAdd: (item: { id: string }) => void;
}

const AddProductToOrderDialog = ({
  products,
  onAdd,
}: AddProductToOrderDialogProps) => {
  const [query, setQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const filteredProducts = useMemo(() => {
    return products.filter((p) =>
      p.name.toLowerCase().includes(query.toLowerCase()),
    );
  }, [query, products]);

  return (
    <div className="space-y-4">
      <Input
        placeholder="Buscar produto..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <div className="max-h-60 space-y-2 overflow-y-auto">
        {filteredProducts.map((product) => (
          <Card
            key={product.id}
            className={`flex cursor-pointer justify-between p-3 transition-all ${
              selectedProduct?.id === product.id
                ? "border-primary bg-primary/10"
                : "hover:border-primary/50"
            }`}
            onClick={() => setSelectedProduct(product)}
          >
            <p className="font-medium">{product.name}</p>
            <p className="text-sm text-muted-foreground">
              R${Number(product.amount).toFixed(2)}
            </p>
          </Card>
        ))}

        {filteredProducts.length === 0 && (
          <p className="mt-4 text-center text-sm text-muted-foreground">
            Nenhum produto encontrado.
          </p>
        )}
      </div>

      {selectedProduct && (
        <div className="flex items-center gap-3 pt-2">
          <Button
            onClick={() => {
              onAdd({ id: selectedProduct.id });
              setSelectedProduct(null);
              setQuery("");
            }}
            className="w-full"
          >
            Adicionar
          </Button>
        </div>
      )}
    </div>
  );
};

export default AddProductToOrderDialog;
