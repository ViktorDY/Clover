/*
  Where each design file lives in the React build.

  The design canvas links between separate "Kretz X.dc.html" files. Here each
  of those is a hash route, so links copied from the design can be resolved
  with designHref() instead of being rewritten by hand.
*/
export const DESIGN_ROUTES = {
  "Kretz.dc.html": "/",
  "Kretz Booking.dc.html": "/booking",
  "Kretz Medlem.dc.html": "/medlem",
  "Kretz Admin.dc.html": "/admin",
  "Kretz Vilkar.dc.html": "/vilkar",
  "Kretz Funksjoner.dc.html": "/funksjoner",
  "Kretz Medlemsregister.dc.html": "/medlemsregister",
  "Kretz Aktiviteter.dc.html": "/aktiviteter",
  "Kretz Hallbooking.dc.html": "/hallbooking",
  "Kretz Okonomi.dc.html": "/okonomi",
  "Kretz Roller.dc.html": "/roller",
  "Kretz AR-oppgave.dc.html": "/arlig-rapportering",
  "Kretz Dokumentsenter.dc.html": "/dokumentsenter",
  "Kretz Integrasjoner.dc.html": "/integrasjoner",
  "Kretz For hvem.dc.html": "/for-hvem",
  "Kretz Nytt.dc.html": "/nytt",
};

/*
  Turn a design link ("Kretz Roller.dc.html", "Kretz.dc.html#kom-i-gang",
  "#faq") into an href for this app.

  A section on the landing page from another view becomes "#/?til=<id>";
  LandingPage scrolls there after it mounts. Plain "#id" links are left as
  they are (use SectionLink for in-page scrolling).
*/
export function designHref(link) {
  if (!link) return "#/";
  if (/^(https?:|mailto:|tel:)/.test(link)) return link;
  const [file, section] = link.split("#");
  if (!file) return `#${section || ""}`;
  const path = DESIGN_ROUTES[decodeURIComponent(file)];
  if (!path) return "#/";
  if (section) return path === "/" ? `#/?til=${section}` : `#${path}?til=${section}`;
  return `#${path}`;
}
