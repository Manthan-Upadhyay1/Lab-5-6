import { createContext, useCallback, useContext, useMemo, useState } from "react";

const DemoContext = createContext(null);

/**
 * Controls the "AI Recommendation Demo" modal from anywhere in the app.
 *   openDemo()         – open with the last-used preferences (Part 1 behaviour)
 *   openDemo(profile)  – open pre-filled from a saved dining profile
 */
export function DemoProvider({ children }) {
  const [state, setState] = useState({ open: false, profile: null });

  const openDemo = useCallback((profile = null) => setState({ open: true, profile }), []);
  const closeDemo = useCallback(() => setState({ open: false, profile: null }), []);

  const value = useMemo(() => ({ ...state, openDemo, closeDemo }), [state, openDemo, closeDemo]);
  return <DemoContext.Provider value={value}>{children}</DemoContext.Provider>;
}

export const useDemo = () => {
  const ctx = useContext(DemoContext);
  if (!ctx) throw new Error("useDemo must be used inside <DemoProvider>");
  return ctx;
};
