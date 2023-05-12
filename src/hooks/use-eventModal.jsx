import { useContext } from "react";

import { EventModalContext } from "../contexts/EventModalContext";

export default function useEventModal() {
  const { isEventOpen, setIsEventOpen, eventOpened, setEventOpened } =
    useContext(EventModalContext);

  return { isEventOpen, setIsEventOpen, eventOpened, setEventOpened };
}
