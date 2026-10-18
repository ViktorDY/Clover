import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Customers from "../components/Customers";
import Platform from "../components/Platform";
import HowItWorks from "../components/HowItWorks";
import Features from "../components/Features";
import About from "../components/About";
import AppPromo from "../components/AppPromo";
import Faq from "../components/Faq";
import GetStarted from "../components/GetStarted";
import Footer from "../components/Footer";
import "../styles/landing.css";

// The handwritten notes use Caveat; only the landing page needs it.
const CAVEAT_HREF = "https://fonts.googleapis.com/css2?family=Caveat:wght@600&display=swap";
if (typeof document !== "undefined" && !document.querySelector(`link[href="${CAVEAT_HREF}"]`)) {
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = CAVEAT_HREF;
  document.head.appendChild(link);
}

export default function LandingPage({ onOpenLogin, onOpenSignup, onOpenBooking }) {
  return (
    <div className="overflow-x-clip bg-paper kz-landing font-body text-[15px] leading-[1.55] text-ink">
      <Navbar
        onOpenLogin={onOpenLogin}
        onOpenSignup={onOpenSignup}
        onOpenBooking={onOpenBooking}
      />
      <Hero onOpenBooking={onOpenBooking} />
      <Customers />
      <Platform />
      <HowItWorks />
      <Features />
      <About />
      <AppPromo />
      <Faq />
      <GetStarted />
      <Footer />
    </div>
  );
}
