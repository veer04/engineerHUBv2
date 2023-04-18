import { useContext } from "react";
import { SidebarContext } from "../contexts/SidebarContext";

export default function useSidebar() {
  const { isCollapsed, setIsCollapsed, selectedItem, setSelectedItem } =
    useContext(SidebarContext);

  return { isCollapsed, setIsCollapsed, selectedItem, setSelectedItem };
}
