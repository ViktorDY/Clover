import { useEffect, useReducer, useState } from "react";
import AdminShell from "../components/admin/AdminShell";
import { AdminLogic } from "../lib/adminLogic";
import { useLang } from "../lib/langContext";
import "../styles/admin.css";
import "../styles/admin-pseudo.css";

/*
  Administrator portal ("Kretz Admin" in the design).

  All state lives in one controller (src/lib/adminLogic.js) that mirrors the
  design's logic class. Each render it derives a flat object `v` — labels in
  the active language, computed styles, lists and event handlers — which the
  components under src/components/admin/ render. Language follows the site's
  NO/EN setting, and the profile page's language picker updates it.
*/
export default function AdminPage({ onExit, onLogOut }) {
  const { lang, setLang, t } = useLang();
  const [, rerender] = useReducer((n) => n + 1, 0);
  const [logic] = useState(() => new AdminLogic(null));

  useEffect(() => {
    logic.attach((patch) => {
      if (patch && patch.lang) setLang(patch.lang);
      rerender();
    });
    logic.componentDidMount();
    return () => {
      logic.componentWillUnmount();
      logic.attach(null);
    };
  }, [logic, setLang]);

  // Run any setState callbacks once the re-render they asked for has landed.
  useEffect(() => {
    logic.flushCallbacks();
  });

  const v = {
    ...logic.view(lang),
    tBackToSite: t("Til nettsiden", "Back to site"),
    tMenu: t("Meny", "Menu"),
    onLogOut: (e) => {
      if (e) e.preventDefault();
      if (onLogOut) onLogOut();
      else if (onExit) onExit();
    },
    onExit: () => {
      if (onExit) onExit();
    },
  };

  return <AdminShell v={v} />;
}
