import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { User2 } from "lucide-react";
import { useAuthStore } from "@/store/authStore";

const Header = () => {
  const navigate = useNavigate();
  const { resetAuth, token, user } = useAuthStore();
  return (
    <header className="w-full h-14 border-b shadow-sm">
      <div className="container h-full flex items-center justify-between">
        <Link to={"/"}>
          <h1 className="font-heading text-3xl font-semibold before:content-['Y'] before:text-primary">
            apier
          </h1>
        </Link>
        <nav className="flex items-center gap-4">
          {token && user ? (
            <>
              <div className="flex items-center gap-2">
                <User2 className="w-5 h-5" />
                {user.name}
              </div>
              <Button variant={"outline"} onClick={() => resetAuth()}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button variant={"ghost"} onClick={() => navigate("/sign-in")}>
                Sign In
              </Button>
              <Button className="px-8" onClick={() => navigate("/sign-up")}>
                Sign Up
              </Button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
