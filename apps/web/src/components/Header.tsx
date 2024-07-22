import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';

const Header = () => {
  const navigate = useNavigate();
  return (
    <header className="w-full h-14 border-b shadow-sm">
      <div className="container mx-auto h-full flex items-center justify-between">
        {/* <img src=''/> */}
        <h1>Logo</h1>
        <nav className="flex items-center gap-4">
          <Button variant={'ghost'} onClick={() => navigate('/auth/sign-in')}>
            Sign In
          </Button>
          <Button
            className="rounded-full px-8 font-medium"
            onClick={() => navigate('/auth/sign-up')}
          >
            Sign Up
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
