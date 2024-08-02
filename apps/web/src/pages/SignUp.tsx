import SignUpForm from '@/components/SignUpForm';
import { CheckFeature } from './CheckFeature';

const SignUp = () => {
  return (
    <div className="flex flex-col items-center">
      <div className="grid items-center sm:grid-cols-[minmax(0px,1fr)_360px] lg:grid-cols-[minmax(0px,1fr)_430px] max-w-5xl gap-8">
        <div className="flex flex-col gap-8 max-w-md">
          <h1 className="text-4xl font-semibold font-heading leading-tight">
            Join millions worldwide who automate their work using Zapier
          </h1>
          <div className="flex flex-col gap-4">
            <CheckFeature label={'Easy setup, no coding required'} />
            <CheckFeature label={'Free forever for core features'} />
            <CheckFeature label={'14-day trial of premium features & apps'} />
          </div>
        </div>

        <SignUpForm />
      </div>
    </div>
  );
};

export default SignUp;
