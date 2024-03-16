import React, { useState, useEffect } from "react";

function useDebounce(value, delay = 500) {
  const [debounceValue, setDebounceValue] = useState("");

  useEffect(() => {
    const timeOut = setTimeout(() => {
      setDebounceValue(value);
    }, delay);

    return () => clearTimeout(timeOut);
  }, [value, delay]);

  return debounceValue;
}

export default useDebounce;
