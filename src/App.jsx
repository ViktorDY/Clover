import { useEffect, useState } from "react";
import LangProvider from "./lib/LangProvider";
import useHashRoute from "./lib/useHashRoute";
import useReveal from "./lib/useReveal";
import LandingPage from "./pages/LandingPage";
import BookingPage from "./pages/BookingPage";
import MemberPage from "./pages/MemberPage";
import VilkarPage from "./pages/VilkarPage";
import LoginModal from "./components/LoginModal";
import SignupModal from "./components/SignupModal";
import BookingPickerModal from "./components/BookingPickerModal";
import { arrivedFromAuthLink, supabase } from "./lib/supabase";

export default function App() {
  return (
    <LangProvider>
      <Routes />
    </LangProvider>
  );
}

function Routes() {
  const { path, params, navigate } = useHashRoute();
  const [isLoginOpen, setLoginOpen] = useState(false);
  const [isSignupOpen, setSignupOpen] = useState(false);
  const [isPickerOpen, setPickerOpen] = useState(false);

  // Every view is its own page as far as the reader is concerned, so start
  // each one at the top and re-arm the scroll reveals.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [path]);
  useReveal(path);

  // Someone who just clicked the confirmation link in their sign-up email
  // lands here already signed in; take them on to the dashboard.
  useEffect(() => {
    if (!arrivedFromAuthLink) return;
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate("/medlem");
    });
  }, [navigate]);

  const goBooking = (slug, fromMember = false) => {
    const query = new URLSearchParams({ klubb: slug });
    if (fromMember) query.set("from", "member");
    navigate(`/booking?${query.toString()}`);
  };

  if (path === "/booking") {
    const fromMember = params.from === "member";
    return (
      <BookingPage
        slug={params.klubb}
        fromMember={fromMember}
        onBack={() => navigate(fromMember ? "/medlem" : "/")}
      />
    );
  }

  if (path === "/vilkar") {
    return <VilkarPage onBack={() => navigate("/")} />;
  }

  if (path === "/medlem") {
    return (
      <MemberPage
        onExit={() => navigate("/")}
        onLogOut={() => {
          // Ends a real Supabase session; harmless for the demo account.
          supabase.auth.signOut();
          navigate("/");
        }}
        onBook={(slug) => goBooking(slug, true)}
      />
    );
  }

  return (
    <>
      <LandingPage
        onOpenLogin={() => setLoginOpen(true)}
        onOpenSignup={() => setSignupOpen(true)}
        onOpenBooking={() => setPickerOpen(true)}
      />

      {isSignupOpen && (
        <SignupModal
          onClose={() => setSignupOpen(false)}
          onSignedIn={() => {
            setSignupOpen(false);
            navigate("/medlem");
          }}
          onOpenTerms={() => {
            setSignupOpen(false);
            navigate("/vilkar");
          }}
        />
      )}

      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setLoginOpen(false)}
        onMemberSignIn={() => {
          setLoginOpen(false);
          navigate("/medlem");
        }}
      />

      {isPickerOpen && (
        <BookingPickerModal
          onClose={() => setPickerOpen(false)}
          onPick={(slug) => {
            setPickerOpen(false);
            goBooking(slug);
          }}
        />
      )}
    </>
  );
}
