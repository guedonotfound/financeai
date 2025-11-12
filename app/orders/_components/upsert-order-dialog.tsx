"use client";

import { CreateOrder } from "@/app/_actions/create-orders";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import ProductsList from "./products-list";
import { Product } from "@prisma/client";
import { Button } from "@/app/_components/ui/button";

interface UpsertOrderDialogProps {
  products: Product[];
  isOpen: boolean;
  defaultValues?: FormSchema;
  setIsOpen: (isOpen: boolean) => void;
}

const formSchema = z.object({
  name: z.string().trim().min(1, { message: "O nome é obrigatório." }),
  products: z.array(
    z.object({
      productId: z.string(),
      quantity: z
        .number()
        .positive({ message: "Selecione pelo menos um produto." }),
    }),
  ),
});

type FormSchema = z.infer<typeof formSchema>;

const UpsertOrderDialog = ({
  products,
  isOpen,
  defaultValues,
  setIsOpen,
}: UpsertOrderDialogProps) => {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues ?? {
      name: "",
      products: [],
    },
  });

  useEffect(() => {
    if (isOpen && defaultValues) {
      form.reset(defaultValues);
    }
  }, [isOpen, defaultValues, form]);

  const onSubmit = async (data: FormSchema) => {
    try {
      await CreateOrder(data);
      setIsOpen(false);
      form.reset();
      toast.success("Pedido criado.");
    } catch (error) {
      console.log(error);
    }
  };
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
          <DialogTitle>Adicionar pedido</DialogTitle>
          <DialogDescription>Insira as informações do pedido</DialogDescription>
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
              name="products"
              render={({}) => (
                <FormItem>
                  <FormLabel>Produtos</FormLabel>
                  <FormControl>
                    <ProductsList form={form} products={products} />
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
              <Button type="submit">Adicionar</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default UpsertOrderDialog;
