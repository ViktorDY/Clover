import markDark from "../assets/kretz-mark.png";
import markLight from "../assets/kretz-mark-light.png";

/*
  The Kretz mark: the four-arc ring from the design canvas.

  Two tones, as the canvas ships them — `dark` (ink arcs, grass accent) for
  light backgrounds, `light` (paper arcs, soft-green accent) for the dark
  administrator panel. Decorative everywhere it is used: the wordmark "Kretz"
  always sits next to it, so the alt text stays empty.
*/
export default function KretzMark({ size = 30, tone = "dark", className = "" }) {
  return (
    <img
      src={tone === "light" ? markLight : markDark}
      alt=""
      width={size}
      height={size}
      className={className}
      style={{ width: size, height: size }}
    />
  );
}
