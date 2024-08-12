import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormItem, FormLabel } from "./ui/form";
import { type SolanaSelector, solanaSelectorSchema } from "@repo/schema";
import { Input } from "./ui/input";

const SolanaSelector = () => {
  const form = useForm<SolanaSelector>({
    resolver: zodResolver(solanaSelectorSchema),
    defaultValues: {
      to: "",
      from: "",
    },
  });
  return (
    <Form {...form}>
      <form>
        <div className="space-y-4">
          <FormField
            name="to"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>To</FormLabel>
                <Input {...field} />
              </FormItem>
            )}
          />
          <FormField
            name="from"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>From</FormLabel>
                <Input {...field} />
              </FormItem>
            )}
          />
        </div>
      </form>
    </Form>
  );
};

export default SolanaSelector;
