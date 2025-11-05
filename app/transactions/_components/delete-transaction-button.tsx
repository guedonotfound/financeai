"use client";

import { deleteTransactions } from "@/app/_actions/delete-transactions";
import { Button } from "@/app/_components/ui/button";
import { TrashIcon } from "lucide-react";

interface DeleteTransactionButtonProps {
  id: string;
}

const DeleteTransactionButton = (id: DeleteTransactionButtonProps) => {
  const handleDeleteTransactionButton = () => {
    deleteTransactions(id);
  };
  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="text-muted-foreground"
        onClick={handleDeleteTransactionButton}
      >
        <TrashIcon />
      </Button>
    </>
  );
};

export default DeleteTransactionButton;
