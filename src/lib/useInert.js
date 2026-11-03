import { useEffect } from 'react';

// React 18 cannot pass the boolean `inert` attribute, so set the DOM property.
export function useInert(ref, inert) {
  useEffect(() => {
    if (ref.current) ref.current.inert = inert;
  }, [ref, inert]);
}
