import { useCallback, useEffect, useState } from "react";

/*
  Dependency-free hash routing.

  The design canvas links between separate .dc.html files. In the React build
  those become views behind the hash, which keeps GitHub Pages happy (no
  server rewrites needed) and adds no router dependency.

    #/            → landing
    #/booking     → hall booking  (?klubb=<slug>&from=member)
    #/medlem      → member dashboard
    #/vilkar      → terms of use
*/

function parse(hash) {
  const raw = (hash || "").replace(/^#/, "");
  const [pathPart, queryPart] = raw.split("?");
  const path = "/" + pathPart.replace(/^\/+/, "").replace(/\/+$/, "");
  const params = {};
  new URLSearchParams(queryPart || "").forEach((value, key) => {
    params[key] = value;
  });
  return { path: path === "/" ? "/" : path, params };
}

export default function useHashRoute() {
  const [route, setRoute] = useState(() =>
    parse(typeof window === "undefined" ? "" : window.location.hash),
  );

  useEffect(() => {
    const onChange = () => setRoute(parse(window.location.hash));
    window.addEventListener("hashchange", onChange);
    return () => window.removeEventListener("hashchange", onChange);
  }, []);

  const navigate = useCallback((to) => {
    // Assigning the hash fires hashchange, which is what updates state.
    if (window.location.hash === "#" + to) {
      setRoute(parse(to));
      return;
    }
    window.location.hash = to;
  }, []);

  return { ...route, navigate };
}
