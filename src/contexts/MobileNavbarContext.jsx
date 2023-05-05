import { createContext } from "react";
import { useState } from "react";

export const MobileNavbarContext = createContext();

export default function MobileNavbarProvider({ children }) {
  const [selectedPage, setSelectedPage] = useState("");

  return (
    <MobileNavbarContext.Provider value={{ selectedPage, setSelectedPage }}>
      {children}
    </MobileNavbarContext.Provider>
  );
}
