import { Outlet } from 'react-router-dom';
import Header from './components/Header';

const Layout = () => {
  return (
    <div className="h-full grid">
      <Header />
      <Outlet />
    </div>
  );
};

export default Layout;
