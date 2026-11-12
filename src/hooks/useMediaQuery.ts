import { useEffect, useState } from "react";

/** Tracks a CSS media query. False during SSR and the first client render. */
export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(query);
    const update = () => setMatches(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [query]);

  return matches;
}

/** Below this width the layout switches to tablet/mobile (stacked, no pinning). */
export const COMPACT_QUERY = "(max-width: 1025px)";
