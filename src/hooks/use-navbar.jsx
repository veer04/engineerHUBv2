import { useContext } from "react";
import { NavbarContext } from "../contexts/NavbarContext";

export default function useNavbar() {
  const { selectedPage, setSelectedPage } = useContext(NavbarContext);

  return { selectedPage, setSelectedPage };
}
