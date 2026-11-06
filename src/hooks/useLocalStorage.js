import { useCallback, useState } from "react";

/** useState that mirrors its value into localStorage (used for "last search"). */
export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const saved = localStorage.getItem(key);
      return saved ? JSON.parse(saved) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const set = useCallback(
    (next) => {
      setValue(next);
      try {
        localStorage.setItem(key, JSON.stringify(next));
      } catch {
        /* storage full / blocked – ignore */
      }
    },
    [key],
  );

  return [value, set];
}
