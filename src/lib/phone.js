/*
  Phone numbers.

  The sign-up form asks for a country (its dialling code) and the number
  separately, and stores the two joined as one string with no spaces, e.g.
  "+4741234567". Add a country here to offer it in the dropdown.
*/
export const PHONE_COUNTRIES = [
  {
    iso: "NO",
    flag: "🇳🇴",
    name: { no: "Norge", en: "Norway" },
    dial: "+47",
    // Norwegian mobile numbers: 8 digits, starting with 4 or 9.
    pattern: /^[49]\d{7}$/,
    example: "412 34 567",
  },
];

export const DEFAULT_PHONE_COUNTRY = "NO";

export function phoneCountry(iso) {
  return PHONE_COUNTRIES.find((c) => c.iso === iso) || PHONE_COUNTRIES[0];
}

/**
 * Turns whatever was typed ("412 34 567", "+47 41234567", "0047-412…") into
 * "+4741234567", or returns null if it isn't a valid number for the country.
 */
export function normalizePhone(input, iso) {
  const country = phoneCountry(iso);
  let digits = String(input || "").replace(/[\s\-().]/g, "");

  // Someone typing the country code again is common; accept it once.
  const code = country.dial.slice(1);
  if (digits.startsWith("+" + code)) digits = digits.slice(code.length + 1);
  else if (digits.startsWith("00" + code)) digits = digits.slice(code.length + 2);

  if (!/^\d+$/.test(digits) || !country.pattern.test(digits)) return null;
  return country.dial + digits;
}
