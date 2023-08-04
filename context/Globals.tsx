import { createContext, useContext, useEffect, useMemo, useState } from "react";


export interface GlobalContextProps {
  mobile: boolean;
  setMobile: (mobile: boolean) => void;
  isClient: boolean;
}

export const GlobalContext = createContext<GlobalContextProps>({
  setMobile: () => {},
  isClient: false,
  mobile: false,
});

export const useGlobalContext = () => useContext(GlobalContext);

export function GlobalContextProvider({ children }: any) {
  const [isClient, setIsClient] = useState(false);
  const [mobile, setMobile] = useState(false);

  

  useEffect(() => {
    setIsClient(true);
    toggleMobile();
    window.addEventListener("resize", toggleMobile);
    return () => window.removeEventListener("resize", toggleMobile);
  }, []);

  function toggleMobile() {
    if (window && window.innerWidth < 700) {
      setMobile(true);
    } else {
      setMobile(false);
    }
  }

  const contextValue = useMemo(
    () => ({
      mobile,
      setMobile,
      isClient,
    }),
    [mobile, setMobile, isClient],
  );

  return (
    <GlobalContext.Provider value={contextValue}>
      {children}
    </GlobalContext.Provider>
  );
}
