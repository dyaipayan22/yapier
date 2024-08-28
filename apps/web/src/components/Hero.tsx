import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Feature } from "./Feature";
import { useAuthStore } from "@/store/authStore";

export const Hero = () => {
  const user = useAuthStore((state) => state.user);
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-center font-medium font-heading text-7xl tracking-tight">
        Automate as fast as you can type
      </h1>
      <p className="text-lg font-medium text-center mt-6 max-w-3xl">
        AI gives you automation superpowers, and Zapier puts them to work.
        Pairing AI and Yapier helps you turn ideas into workflows and bots that
        work for you.
      </p>

      <Button
        onClick={() => {
          user ? navigate("/dashboard") : navigate("/sign-up");
        }}
        className="mt-8 px-12 py-6"
      >
        Get started for free
      </Button>

      <div className="flex items-center gap-6 justify-center mt-8 flex-wrap">
        <Feature title={"Free Forever"} subtitle={"for core features"} />
        <Feature title={"More apps"} subtitle={"than any other platforms"} />
        <Feature title={"Cutting Edge"} subtitle={"AI Features"} />
      </div>
    </div>
  );
};
