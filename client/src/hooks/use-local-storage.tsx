import { createContext, useContext, useMemo } from "react";

interface LocalStorageProviderProps {
  children: React.ReactNode;
}

const LocalStorageContext = createContext(
  {} as {
    getValue(key: string): string | null;
    setValue(key: string, value: string): void;
  },
);

const LocalStorageProvider = ({ children }: LocalStorageProviderProps) => {
  const getValue = (key: string) => {
    return localStorage.getItem(key);
  };

  const setValue = (key: string, value: string) => {
    localStorage.setItem(key, value);
  };

  const value = useMemo(
    () => ({
      getValue,
      setValue,
    }),
    [getValue, setValue],
  );

  return <LocalStorageContext.Provider value={value}>{children}</LocalStorageContext.Provider>;
};

const useLocalStorage = () => useContext(LocalStorageContext);

export { LocalStorageProvider, useLocalStorage };
