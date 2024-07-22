import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
  return (
    <div className="bg-red-50">
      <div className="h-full container mx-auto px-5 sm:px-7 lg:px-14">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
