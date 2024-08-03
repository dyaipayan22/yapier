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
import axios from 'axios';

const SignInForm = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';

  const form = useForm<SignInInput>({
    resolver: zodResolver(SignInInputSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onSubmit(values: SignInInput) {
    await axios.post('/auth/signIn', values);
    console.log(values);
    navigate(from, { replace: true });
  }

  return (
    <AuthFormWrapper
      title="Sign in to your account"
      footer="Don't have a Yapier account yet?"
      linkText="Sign up"
      linkUrl="/sign-in"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="space-y-4">
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
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
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button
            type="submit"
            disabled={form.formState.isSubmitting || form.formState.isDirty}
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
