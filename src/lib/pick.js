/*
  Seed content stores every string as { no, en }, but anything the visitor
  types or uploads during the session is a plain string. `pick` accepts
  either, so components never have to care which they are holding.
*/
export default function pick(value, lang) {
  if (value && typeof value === "object") return value[lang] ?? value.no ?? "";
  return value ?? "";
}
