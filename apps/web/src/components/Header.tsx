import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { useAuthStore } from "@/store/authStore";

const Header = () => {
  const navigate = useNavigate();
  const { resetAuth, token, user } = useAuthStore();
  return (
    <header className="w-full h-14 border-b shadow-sm">
      <div className="container h-full flex items-center justify-between">
        <h1 className="font-heading text-3xl font-semibold before:content-['Y'] before:text-primary">
          apier
        </h1>
        <nav className="flex items-center gap-4">
          {token && user ? (
            <>
              <Button variant={"outline"} onClick={() => resetAuth()}>
                Logout{" "}
              </Button>
              <span>{user.name}</span>
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
