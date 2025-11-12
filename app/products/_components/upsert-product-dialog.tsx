"use client";

import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/_components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/_components/ui/form";
import { Input } from "@/app/_components/ui/input";
import { MoneyInput } from "@/app/_components/money-input";
import { Button } from "@/app/_components/ui/button";
import { toast } from "sonner";
import { upsertProduct } from "@/app/_actions/upsert-products";

interface UpsertProductDialogProps {
  isOpen: boolean;
  defaultValues?: FormSchema;
  transactionId?: string;
  setIsOpen: (isOpen: boolean) => void;
}

const formSchema = z.object({
  name: z.string().trim().min(1, { message: "O nome é obrigatório." }),
  amount: z
    .number({
      message: "O valor é obrigatório",
    })
    .positive({
      message: "O valor deve ser informado.",
    }),
});

type FormSchema = z.infer<typeof formSchema>;

const UpsertProductDialog = ({
  isOpen,
  defaultValues,
  transactionId,
  setIsOpen,
}: UpsertProductDialogProps) => {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues ?? {
      amount: 0,
      name: "",
    },
  });

  useEffect(() => {
    if (isOpen && defaultValues) {
      form.reset(defaultValues);
    }
  }, [isOpen, defaultValues, form]);

  const onSubmit = async (data: FormSchema) => {
    try {
      await upsertProduct({ ...data, id: transactionId });
      setIsOpen(false);
      form.reset();
      if (transactionId) {
        toast.success("Produto atualizada.");
      } else {
        toast.success("Produto criada.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const isUpdate = Boolean(transactionId);

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        setIsOpen(open);
        if (!open) {
          form.reset();
        } else {
          form.reset(defaultValues);
        }
      }}
    >
      <DialogTrigger asChild></DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {isUpdate ? "Atualizar" : "Adicionar"} produto
          </DialogTitle>
          <DialogDescription>
            {isUpdate ? "Atualize" : "Insira"} as informações do produto
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Digite o nome..."
                      autoComplete="off"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Valor</FormLabel>
                  <FormControl>
                    <MoneyInput
                      placeholder="R$ 0,00"
                      onValueChange={({ floatValue }) =>
                        field.onChange(floatValue)
                      }
                      autoComplete="off"
                      onBlur={field.onBlur}
                      disabled={field.disabled}
                      defaultValue={defaultValues?.amount}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  Cancelar
                </Button>
              </DialogClose>
              <Button type="submit">
                {isUpdate ? "Atualizar" : "Adicionar"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default UpsertProductDialog;
