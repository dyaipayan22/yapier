import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SignInInputSchema, type SignInInput } from '@repo/schema';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form';
import { Input } from './ui/input';
import AuthFormWrapper from './AuthFormWrapper';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { toast } from 'sonner';
import axiosPublic from '@/lib/axios';

const SignInForm = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/dashboard';

  const form = useForm<SignInInput>({
    resolver: zodResolver(SignInInputSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onSubmit(values: SignInInput) {
    try {
      const response = await axiosPublic.post('/api/v1/auth/signIn', values, {
        withCredentials: true,
      });
      console.log(response.data);
      toast.success('Login successful');
      form.reset();
      navigate(from, { replace: true });
    } catch {
      toast.error('Something went wrong');
    }
  }

  return (
    <AuthFormWrapper
      title="Sign in to your account"
      footer="Don't have a Yapier account yet?"
      linkText="Sign up"
      linkUrl="/sign-up"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="space-y-4">
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
            Continue
          </Button>
        </form>
      </Form>
    </AuthFormWrapper>
  );
};

export default SignInForm;
