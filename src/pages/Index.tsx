import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturedEvents from "@/components/FeaturedEvents";
import CategoryShowcase from "@/components/CategoryShowcase";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <FeaturedEvents />
      <CategoryShowcase />
      <Footer />
    </div>
  );
};

export default Index;
