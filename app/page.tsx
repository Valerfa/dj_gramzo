import About from "@/components/About";
import Hero from "../components/Hero";
import Gallery from "@/components/Gallery";
import Work from "@/components/Work";
import Reviews from "@/components/Reviews";
import Footer from "@/components/Footer";
  
export default function HomePage() {
  return (
    <>
      <Hero />
      <About/>
      <Gallery />
      <Work />
      <Footer/>
    </>
  );
}