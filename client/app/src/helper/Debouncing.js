


import { useRef } from 'react';

function useDebounce(callback, delay) {
  const timerRef = useRef();

  const debouncedCallback = (...args) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => {
      callback(...args);
    }, delay);
  };

  return debouncedCallback;
}

export default useDebounce;
