// ─── useAIBrief ───────────────────────────────────────────────────────────────
// Fetches a screen's AI brief when that screen is focused, not when it mounts.
// The tab navigator keeps mounted screens alive, so a plain useEffect would fire
// for every tab at startup — this makes the call happen on arrival instead.

import { useCallback, useRef, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { getAIBrief } from '../services/aiService';

export function useAIBrief(scope) {
  const [state, setState] = useState({
    data: null,
    loading: true,
    error: null,
  });

  const requestedRef = useRef(false);
  // Guards against a state update after the screen unmounts mid-request
  const activeRef = useRef(true);

  const load = useCallback(async () => {
    setState({ data: null, loading: true, error: null });
    try {
      const data = await getAIBrief(scope);
      if (activeRef.current) setState({ data, loading: false, error: null });
    } catch (error) {
      if (activeRef.current) setState({ data: null, loading: false, error });
    }
  }, [scope]);

  useFocusEffect(
    useCallback(() => {
      activeRef.current = true;

      // Fetch once per mount — refocusing a tab shouldn't re-trigger it
      if (!requestedRef.current) {
        requestedRef.current = true;
        load();
      }

      return () => {
        activeRef.current = false;
      };
    }, [load])
  );

  const refresh = useCallback(() => {
    requestedRef.current = true;
    load();
  }, [load]);

  return { ...state, refresh };
}

export default useAIBrief;
