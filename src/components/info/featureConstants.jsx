/* Constants shared by the feature pages (see FeatureSections.jsx). */

/* The dotted mint frame every hero mockup sits in. */
export const MOCK_FRAME = {
  position: "relative",
  borderRadius: 34,
  backgroundColor: "#eaf6ec",
  backgroundImage:
    "radial-gradient(rgba(31,122,58,.16) 1px, transparent 1.2px), linear-gradient(160deg, #f1faf2 0%, #e2f2e6 100%)",
  backgroundSize: "16px 16px, 100% 100%",
};

/* Shared icon paths (inside IconTile's 24×24 svg). */
export const ICONS = {
  people: (
    <>
      <circle cx="9" cy="8" r="3" />
      <path d="M3.5 19a5.5 5.5 0 0 1 11 0" />
      <path d="M16 5.5a3 3 0 0 1 0 5.5M17.5 14.5A5.5 5.5 0 0 1 20.5 19" />
    </>
  ),
  lock: (
    <>
      <rect x="5" y="11" width="14" height="10" rx="2" />
      <path d="M8 11V8a4 4 0 0 1 8 0v3" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8" />
      <path d="M12 8v4l3 2" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3l7 3v5c0 4.5-3 8.2-7 10-4-1.8-7-5.5-7-10V6l7-3z" />
      <path d="M9 12l2 2 4-4" />
    </>
  ),
  cash: (
    <>
      <rect x="3" y="6" width="18" height="12" rx="2" />
      <circle cx="12" cy="12" r="2.5" />
      <path d="M6.5 9.5v.01M17.5 14.5v.01" />
    </>
  ),
  bell: (
    <>
      <path d="M6 16V11a6 6 0 0 1 12 0v5l1.5 2h-15L6 16z" />
      <path d="M10 20.5a2 2 0 0 0 4 0" />
    </>
  ),
  folder: (
    <>
      <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7z" />
      <path d="M9 13h6" />
    </>
  ),
  pen: (
    <>
      <path d="M4 20l4-1 10-10-3-3L5 16l-1 4z" />
      <path d="M13 8l3 3M14 20h6" />
    </>
  ),
};
