"use client";

import { Button } from "./ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { MoneyInput } from "./money-input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  TRANSACTION_CATEGORY,
  TRANSACTION_PAYMENT_METHODS,
  TRANSACTION_TYPE_OPTIONS,
} from "../_constants/transaction";
import { DatePicker } from "./ui/date-picker";
import z from "zod";
import {
  TransactionType,
  TransactionCategory,
  TransactionPaymentMethod,
} from "@prisma/client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { upsertTransaction } from "../_actions/upsert-transactions";
import { useEffect } from "react";
import { toast } from "sonner";

interface UpsertTransactionDialogProps {
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
  type: z.nativeEnum(TransactionType, {
    message: "O tipo é obrigatório.",
  }),
  category: z.nativeEnum(TransactionCategory, {
    message: "A categoria é obrigatória",
  }),
  paymentMethod: z.nativeEnum(TransactionPaymentMethod, {
    message: "O método é obrigatório.",
  }),
  date: z.date({ message: "A data é obrigatória." }),
});

type FormSchema = z.infer<typeof formSchema>;

const UpsertTransactionDialog = ({
  isOpen,
  defaultValues,
  transactionId,
  setIsOpen,
}: UpsertTransactionDialogProps) => {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues ?? {
      amount: 0,
      category: undefined,
      date: new Date(),
      name: "",
      paymentMethod: undefined,
      type: undefined,
    },
  });

  useEffect(() => {
    if (isOpen && defaultValues) {
      form.reset(defaultValues);
    }
  }, [isOpen, defaultValues, form]);

  const onSubmit = async (data: FormSchema) => {
    try {
      await upsertTransaction({ ...data, id: transactionId });
      setIsOpen(false);
      form.reset();
      if (transactionId) {
        toast.success("Transação atualizada.");
      } else {
        toast.success("Transação criada.");
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
            {isUpdate ? "Atualizar" : "Adicionar"} transação
          </DialogTitle>
          <DialogDescription>
            {isUpdate ? "Atualize" : "Insira"} as informações da transação
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
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={defaultValues?.type}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o tipo da transação..." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {TRANSACTION_TYPE_OPTIONS.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Categoria</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={defaultValues?.category}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione a categoria..." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {TRANSACTION_CATEGORY.sort((a, b) =>
                        a.label.localeCompare(b.label),
                      ).map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="paymentMethod"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Método de pagamento</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={defaultValues?.paymentMethod}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o método de pagamento..." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {TRANSACTION_PAYMENT_METHODS.sort((a, b) =>
                        a.label.localeCompare(b.label),
                      ).map((option) => (
                        <SelectItem
                          key={option.value}
                          value={option.value}
                          defaultValue={defaultValues?.paymentMethod}
                        >
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Data</FormLabel>
                  <DatePicker value={field.value} onChange={field.onChange} />
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

export default UpsertTransactionDialog;
