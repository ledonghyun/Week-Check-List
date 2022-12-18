import { useEffect, useState } from "react";

const useLocalStorage = (localStorageKey, valueInitial) => {
  const [value, setValue] = useState(
    JSON.parse(localStorage.getItem(localStorageKey)) || valueInitial
  );

  useEffect(()=>{
    localStorage.setItem(localStorageKey, JSON.stringify(value));
  }, [value, setValue]);

  return [value, setValue];
}

export default useLocalStorage;