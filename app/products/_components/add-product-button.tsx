"use client";

import { useState } from "react";
import { Button } from "@/app/_components/ui/button";
import { PackageIcon } from "lucide-react";
import UpsertProductDialog from "./upsert-product-dialog";

const AddProductButton = () => {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);

  return (
    <>
      <Button
        className="rounded-full font-bold"
        onClick={() => setDialogIsOpen(true)}
      >
        Adicionar produto
        <PackageIcon />
      </Button>
      <UpsertProductDialog isOpen={dialogIsOpen} setIsOpen={setDialogIsOpen} />
    </>
  );
};

export default AddProductButton;
