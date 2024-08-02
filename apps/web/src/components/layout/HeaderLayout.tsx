import { Outlet } from 'react-router-dom';
import Header from '@/components/Header';

const HeaderLayout = () => {
  return (
    <div className="h-full grid">
      <Header />
      <div className="container py-10">
        <Outlet />
      </div>
    </div>
  );
};

export default HeaderLayout;
