import { deleteOrder } from "@/app/_actions/delete-orders";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogFooter,
  AlertDialogTitle,
} from "@/app/_components/ui/alert-dialog";
import { Button } from "@/app/_components/ui/button";
import { TrashIcon } from "lucide-react";
import { toast } from "sonner";

interface DeleteOrderButtonProps {
  id: string;
}

const DeleteOrderButton = ({ id }: DeleteOrderButtonProps) => {
  const handleDeleteOrderButton = () => {
    try {
      deleteOrder({ id });
      toast.warning("Pedido excluído.");
    } catch (error) {
      console.log(error);
      toast.error("Erro ao deletar pedido.");
    }
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" size="icon" className="text-muted-foreground">
          <TrashIcon />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Excluir pedido?</AlertDialogTitle>
          <AlertDialogDescription>
            Ao confirmar, este pedido será excluído de forma permanente e não
            poderá ser recuperado.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            onClick={handleDeleteOrderButton}
          >
            Excluir
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteOrderButton;
