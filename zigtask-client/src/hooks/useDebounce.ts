import { useEffect, useState } from "react";

export function useDebounce<T>(value: T, delay: number) {
  const [debounce, setDebounce] = useState<T>(value);

  useEffect(() => {
    const timeOut = setTimeout(() => {
      setDebounce(value);
    }, delay);

    return () => clearTimeout(timeOut);
  }, [value, delay]);

  return debounce;
}
