import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import HowItWorks from "../components/HowItWorks";
import Features from "../components/Features";
import Customers from "../components/Customers";
import About from "../components/About";
import AppPromo from "../components/AppPromo";
import Faq from "../components/Faq";
import GetStarted from "../components/GetStarted";
import Footer from "../components/Footer";

export default function LandingPage({ onOpenLogin, onOpenBooking }) {
  return (
    <div className="overflow-x-hidden bg-paper text-ink">
      <Navbar onOpenLogin={onOpenLogin} onOpenBooking={onOpenBooking} />
      <Hero onOpenBooking={onOpenBooking} />
      <HowItWorks />
      <Features />
      <Customers />
      <About />
      <AppPromo />
      <Faq />
      <GetStarted />
      <Footer onOpenBooking={onOpenBooking} />
    </div>
  );
}
