import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axiosPublic from "@/lib/axios";
import { createUserInputSchema, type CreateUserInput } from "@repo/schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import AuthFormWrapper from "./AuthFormWrapper";
import { Button } from "./ui/button";
import { toast } from "sonner";

const SignUpForm = () => {
  const form = useForm<CreateUserInput>({
    resolver: zodResolver(createUserInputSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: CreateUserInput) {
    try {
      await axiosPublic.post(`/api/v1/user/create`, values);
      toast.success("Account created");
      form.reset();
    } catch {
      toast.error("Something went wrong");
    }
  }
  return (
    <AuthFormWrapper
      title="Create an account"
      footer="By signing up, you agree to Yapier's terms of service and privacy policy"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="space-y-4">
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="after:content-['*'] after:text-primary after:ml-0.5">
                    Name
                  </FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="after:content-['*'] after:text-primary after:ml-0.5">
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="after:content-['*'] after:text-primary after:ml-0.5">
                    Password
                  </FormLabel>
                  <FormControl>
                    <Input {...field} type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button
            type="submit"
            disabled={form.formState.isSubmitting || !form.formState.isDirty}
            className="rounded-full w-full py-5 font-medium"
          >
            Get started
          </Button>
        </form>
      </Form>
    </AuthFormWrapper>
  );
};

export default SignUpForm;
