// ─── useFilter ────────────────────────────────────────────────────────────────
// Small reusable filtering hook for list screens. Keeps the active filter in
// state and returns the memoized filtered result.
//
//   const { active, setActive, filtered } = useFilter(items, predicate, 'All');

import { useMemo, useState } from 'react';

export function useFilter(items, predicate, initial = 'All') {
  const [active, setActive] = useState(initial);

  const filtered = useMemo(() => {
    if (active === 'All' || active == null) return items;
    return items.filter((item) => predicate(item, active));
  }, [items, active, predicate]);

  return { active, setActive, filtered };
}

export default useFilter;
