import Hv from "./Hv";
import markAlpha from "../assets/design/kretz-mark-alpha.png";
import { useLang } from "../lib/langContext";

/*
  The slim sticky header the design's feature / info pages share: a round
  back button, the Kretz wordmark (both go to the landing page) and an
  optional slot on the right.
*/
export default function SubpageHeader({ children }) {
  const { t } = useLang();
  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 20,
        backdropFilter: "blur(20px)",
        background: "rgba(246,248,243,.86)",
        borderBottom: "1px solid rgba(22,36,26,.1)",
      }}
    >
      <div
        data-rsp-wide
        data-rsp-pad
        style={{ maxWidth: 1200, margin: "0 auto", padding: "14px 28px", display: "flex", alignItems: "center", gap: 14 }}
      >
        <Hv
          as="a"
          href="#/"
          aria-label={t("Tilbake til forsiden", "Back to the front page")}
          style="width: 40px; height: 40px; flex: 0 0 auto; border-radius: 999px; border: 1px solid rgba(22,36,26,.2); display: grid; place-items: center; color: #16241a; font-size: 17px; transition: background .3s"
          hover="background: rgba(22,36,26,.08)"
        >
          ←
        </Hv>
        <a
          href="#/"
          style={{ display: "flex", alignItems: "center", gap: 10, color: "#16241a", fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 19 }}
        >
          <img src={markAlpha} alt="" style={{ width: 24, height: 24 }} />
          Kretz
        </a>
        <div style={{ flex: 1 }} />
        {children}
      </div>
    </header>
  );
}
