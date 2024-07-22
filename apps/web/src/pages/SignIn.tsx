import SignInForm from '@/components/SignInForm';

const SignIn = () => {
  return (
    <div className="grid sm:grid-cols-[minmax(0px,1fr)_360px] lg:grid-cols-[minmax(0px,1fr)_430px]">
      <div>
        <h1>Join our community</h1>
        <p></p>
      </div>
      <SignInForm />
    </div>
  );
};

export default SignIn;
