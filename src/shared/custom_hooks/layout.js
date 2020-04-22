import { useEffect, useState } from "react";

export const useListenOutsideClick = (ref) => {
  const [isClickOutside, setIsClickOutside] = useState(false);

  useEffect(() => {
    if (window && typeof window !== "undefined") {
      window.addEventListener("click", listenIsClickOutside);
    }

    return () => {
      window.removeEventListener("click", listenIsClickOutside);
    };
  }, [ref]);

  const listenIsClickOutside = (e) => {
    ref && ref.current && ref.current.contains(e.target) && !isClickOutside
      ? setIsClickOutside(false)
      : setIsClickOutside(true);
  };

  return isClickOutside;
};
