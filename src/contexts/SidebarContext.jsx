import { createContext, useEffect } from "react";
import { useState } from "react";

export const SidebarContext = createContext();

export default function SidebarProvider({ children }) {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [selectedItem, setSelectedItem] = useState("");

  useEffect(() => {
    if (window.location.href.includes("chat")) setSelectedItem("chat");
    else if (window.location.href.includes("projects"))
      setSelectedItem("projects");
    else if (window.location.href.includes("events")) setSelectedItem("events");
    else if (window.location.href.includes("blogs")) setSelectedItem("blogs");
  }, [window.location.href]);

  return (
    <SidebarContext.Provider
      value={{ isCollapsed, setIsCollapsed, selectedItem, setSelectedItem }}
    >
      {children}
    </SidebarContext.Provider>
  );
}
