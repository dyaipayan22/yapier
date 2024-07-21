import { Button } from './ui/button';

const Header = () => {
  return (
    <header className="w-full h-14 border-b shadow-sm">
      <div className="container mx-auto h-full flex items-center justify-between">
        {/* <img src=''/> */}
        <h1>Logo</h1>
        <nav className="flex items-center gap-4">
          <Button variant={'ghost'}>Sign In</Button>
          <Button className="rounded-full px-8">Sign Up</Button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
