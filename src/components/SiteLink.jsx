import Hv from "./Hv";
import SectionLink from "./SectionLink";
import { designHref } from "../lib/routes";

/*
  A link copied from the design that works on every page.

    <SiteLink to="Kretz Roller.dc.html">       → #/roller
    <SiteLink to="#funksjoner">                → landing section
    <SiteLink to="Kretz.dc.html#kom-i-gang">   → landing section

  Landing sections scroll in place (SectionLink) when we are on the landing
  page, and become "#/?til=<id>" from any other page, which LandingPage then
  scrolls to. "#topp" from another page is simply "#/".

  `onLanding` is optional: when it is left out the current hash route decides
  (the navbar and footer remount whenever the view changes, so reading it at
  render is enough). `style` / `hover` take design style strings, as in Hv.
*/
function isLandingRoute() {
  if (typeof window === "undefined") return true;
  const path = (window.location.hash || "").replace(/^#/, "").split("?")[0].replace(/^\/+|\/+$/g, "");
  return path === "";
}

export default function SiteLink({ to, onLanding, style, hover, children, ...rest }) {
  const landing = onLanding ?? isLandingRoute();
  const [file, section] = (to || "").split("#");
  const isLandingSection = section && (!file || decodeURIComponent(file) === "Kretz.dc.html");

  if (isLandingSection && landing) {
    return (
      <Hv as={SectionLink} to={section} style={style} hover={hover} {...rest}>
        {children}
      </Hv>
    );
  }

  let href;
  if (isLandingSection) href = section === "topp" ? "#/" : designHref(`Kretz.dc.html#${section}`);
  else href = designHref(to);

  return (
    <Hv as="a" href={href} style={style} hover={hover} {...rest}>
      {children}
    </Hv>
  );
}
