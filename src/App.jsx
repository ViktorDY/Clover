import { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Problem from "./components/Problem";
import Funksjoner from "./components/Funksjoner";
import SlikFungererDet from "./components/SlikFungererDet";
import AboutUs from "./components/AboutUs";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import FinalCta from "./components/FinalCta";
import LoginModal from "./components/LoginModal";

function App() {
  // Login modal state lives here because both the Navbar and the final CTA
  // section need to be able to open it.
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  return (
    <div className="min-h-screen w-full bg-white">
      <Navbar onOpenLogin={() => setIsLoginOpen(true)} />
      <Hero />
      <Problem />
      <Funksjoner />
      <SlikFungererDet />
      <AboutUs />
      <Testimonials />
      <Contact />
      <FinalCta onOpenLogin={() => setIsLoginOpen(true)} />

      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </div>
  );
}

export default App;