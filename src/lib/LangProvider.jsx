import { useCallback, useMemo, useState } from "react";
import { LangContext } from "./langContext";

const STORAGE_KEY = "kretz.lang";

function readStored() {
  try {
    return window.localStorage.getItem(STORAGE_KEY) === "en" ? "en" : "no";
  } catch {
    return "no";
  }
}

export default function LangProvider({ children }) {
  const [lang, setLangState] = useState(readStored);

  const setLang = useCallback((next) => {
    setLangState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Private browsing or blocked storage — the toggle still works for
      // this visit, it just will not be remembered.
    }
  }, []);

  const value = useMemo(() => {
    const isEn = lang === "en";
    return {
      lang,
      isEn,
      setLang,
      toggleLang: () => setLang(isEn ? "no" : "en"),
      t: (no, en) => (isEn && en !== undefined ? en : no),
    };
  }, [lang, setLang]);

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}
