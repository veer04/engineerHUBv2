import { createContext } from "react";
import { useState } from "react";

export const NavbarContext = createContext();

export default function NavbarProvider({ children }) {
  const [selectedPage, setSelectedPage] = useState("");

  return (
    <NavbarContext.Provider value={{ selectedPage, setSelectedPage }}>
      {children}
    </NavbarContext.Provider>
  );
}
