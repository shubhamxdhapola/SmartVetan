import HomeNav from "../components/navbar/HomeNav";
import Hero from "../components/home/Hero";
import Features from "../components/home/Features";
import CTA from "../components/home/CTA";
import Footer from "../components/home/Footer";

const Home = () => {
  return (
    <div className="bg-[#060e20] text-white min-h-screen">
      <HomeNav />
      <div className="overflow-x-hidden">
        <Hero />
        <Features />
        <CTA />
        <Footer />
      </div>
    </div>
  );
};

export default Home;
