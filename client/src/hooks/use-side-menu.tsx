import { FC, createContext, useContext, useMemo, useState } from "react";

interface SideMenuProviderProps {
  children: React.ReactNode;
}

const SideMenuContext = createContext(
  {} as {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  },
);

const SideMenuProvider: FC<SideMenuProviderProps> = ({ children }) => {
  const [open, setOpen] = useState<boolean>(false);

  const value = useMemo(
    () => ({
      open,
      setOpen,
    }),
    [open, setOpen],
  );

  return <SideMenuContext.Provider value={value}>{children}</SideMenuContext.Provider>;
};

const useSideMenu = () => useContext(SideMenuContext);

export { SideMenuProvider, useSideMenu };
