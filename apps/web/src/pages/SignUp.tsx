import SignUpForm from '@/components/SignUpForm';

const SignUp = () => {
  return (
    <div className="grid items-center sm:grid-cols-[minmax(0px,1fr)_360px] lg:grid-cols-[minmax(0px,1fr)_430px]">
      <div>
        <h1 className="text-4xl font-semibold">
          Join millions worldwide who automate their work using Zapier
        </h1>
        <p>Bullet Points here</p>
      </div>
      <SignUpForm />
    </div>
  );
};

export default SignUp;
