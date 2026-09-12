import { createContext, useContext } from "react";

// The Kretz design ships every string in Norwegian and English, with an
// NO/EN toggle in the header. Rather than a full i18n library, components
// call t("norsk", "english") and get whichever is active.
export const LangContext = createContext({
  lang: "no",
  setLang: () => {},
  toggleLang: () => {},
  t: (no) => no,
  isEn: false,
});

export function useLang() {
  return useContext(LangContext);
}
