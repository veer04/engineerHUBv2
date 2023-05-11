import { createContext } from "react";
import { useState } from "react";

export const NavbarContext = createContext();

export default function NavbarProvider({ children }) {
  const [selectedPageNavbar, setSelectedPageNavbar] = useState(null);

  return (
    <NavbarContext.Provider value={{ selectedPageNavbar, setSelectedPageNavbar }}>
      {children}
    </NavbarContext.Provider>
  );
}
