import { useContext } from "react";
import { NavbarContext } from "../contexts/NavbarContext";

export default function useNavbar() {
  const { selectedPageNavbar, setSelectedPageNavbar } = useContext(NavbarContext);

  return { selectedPageNavbar, setSelectedPageNavbar };
}
