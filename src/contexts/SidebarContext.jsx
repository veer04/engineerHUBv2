import { createContext } from "react";
import { useState } from "react";

export const SidebarContext = createContext();

export default function SidebarProvider({ children }) {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [selectedItem, setSelectedItem] = useState("");

  return (
    <SidebarContext.Provider
      value={{ isCollapsed, setIsCollapsed, selectedItem, setSelectedItem }}
    >
      {children}
    </SidebarContext.Provider>
  );
}
