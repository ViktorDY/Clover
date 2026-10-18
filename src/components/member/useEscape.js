import { useEffect, useRef } from "react";

/*
  Escape closes the topmost open layer only. Every dialog, menu and panel
  registers here while it is open; the most recent one wins.
*/
const escapeStack = [];

function onEscapeKey(event) {
  if (event.key !== "Escape" || !escapeStack.length) return;
  const top = escapeStack[escapeStack.length - 1];
  top.current();
}

export default function useEscape(onEscape, active = true) {
  const ref = useRef(onEscape);
  useEffect(() => {
    ref.current = onEscape;
  });
  useEffect(() => {
    if (!active) return undefined;
    if (!escapeStack.length) window.addEventListener("keydown", onEscapeKey);
    escapeStack.push(ref);
    return () => {
      const i = escapeStack.lastIndexOf(ref);
      if (i !== -1) escapeStack.splice(i, 1);
      if (!escapeStack.length) window.removeEventListener("keydown", onEscapeKey);
    };
  }, [active]);
}

