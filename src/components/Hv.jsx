import { useState } from "react";
import { sx } from "../lib/sx";

/*
  An element with the design's `style` and `style-hover` strings.

    <Hv as="a" href="…" style="padding: 8px; background: #fff"
        hover="background: #a3e2ae">…</Hv>

  The hover style is merged in on pointer hover and keyboard focus, which is
  what the design canvas does with style-hover.
*/
export default function Hv({ as: Tag = "div", style, hover, onMouseEnter, onMouseLeave, onFocus, onBlur, ...rest }) {
  const [on, setOn] = useState(false);
  const base = sx(style) || {};
  const merged = on && hover ? { ...base, ...sx(hover) } : base;
  return (
    <Tag
      {...rest}
      style={merged}
      onMouseEnter={(e) => {
        setOn(true);
        onMouseEnter?.(e);
      }}
      onMouseLeave={(e) => {
        setOn(false);
        onMouseLeave?.(e);
      }}
      onFocus={(e) => {
        setOn(true);
        onFocus?.(e);
      }}
      onBlur={(e) => {
        setOn(false);
        onBlur?.(e);
      }}
    />
  );
}
