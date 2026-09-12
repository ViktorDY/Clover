/*
  The Kretz mark.

  The design canvas referenced a raster logo (kretz-mark-alpha.png) that does
  not ship with the repo, so this is a vector stand-in built from the same
  palette: a rounded tile with a stencil K. Two tones, matching the design's
  two logo files — `dark` for light backgrounds, `light` for the dark
  administrator panel. Swap in the real artwork by replacing this component.
*/
export default function KretzMark({ size = 30, tone = "dark", className = "" }) {
  const tile = tone === "light" ? "#a3e2ae" : "#74cd85";
  const glyph = "#16241a";

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <rect width="48" height="48" rx="14" fill={tile} />
      <g stroke={glyph} strokeWidth="6" strokeLinecap="round">
        <path d="M16 12v24" />
        <path d="M33 13 19 25" />
        <path d="M19 23l15 13" />
      </g>
    </svg>
  );
}
