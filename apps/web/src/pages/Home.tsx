import { Hero } from "@/components/Hero";
import HeroVideo from "@/components/HeroVideo";

const Home = () => {
  return (
    <div className="flex flex-col gap-8">
      <Hero />
      <HeroVideo />
    </div>
  );
};

export default Home;
