import { createContext } from "react";
import ReactDOM from "react-dom/client";
import React, { useState } from "react";
import Modal from "../Components/EventModal/Modal";

export const EventModalContext = createContext();

export const EventModalProvider = ({ children }) => {
  const [isEventOpen, setIsEventOpen] = useState(false);
  const [eventOpened, setEventOpened] = useState(undefined);

  isEventOpen &&
    ReactDOM.createRoot(
      document.getElementById("event-modal-container")
    ).render(
      <React.StrictMode>
        <Modal />
      </React.StrictMode>
    );

  return (
    <EventModalContext.Provider
      value={{ isEventOpen, setIsEventOpen, eventOpened, setEventOpened }}
    >
      {children}
    </EventModalContext.Provider>
  );
};
