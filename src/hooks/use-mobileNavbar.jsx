import { useContext } from "react";
import { MobileNavbarContext } from "../contexts/MobileNavbarContext";

export default function useMobileNavbar() {
  const { selectedPage, setSelectedPage } = useContext(MobileNavbarContext);

  return { selectedPage, setSelectedPage };
}
