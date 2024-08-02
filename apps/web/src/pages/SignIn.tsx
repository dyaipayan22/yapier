import SignInForm from '@/components/SignInForm';

const SignIn = () => {
  return (
    <div className="flex flex-col items-center">
      <div className="grid items-center sm:grid-cols-[minmax(0px,1fr)_360px] lg:grid-cols-[minmax(0px,1fr)_430px] max-w-5xl gap-8">
        <div className="flex flex-col gap-8 max-w-lg">
          <h1 className="text-4xl font-semibold font-heading leading-tight">
            Automate across your teams
          </h1>
          <p className="">
            Zapier Enterprise empowers everyone in your business to securely
            automate their work in minutes, not months—no coding required.
          </p>
        </div>

        <SignInForm />
      </div>
    </div>
  );
};

export default SignIn;
