import { createContext } from "react";
import { useState } from "react";

export const CommunityChatContext = createContext();

export const CommunityChatProvider = ({ children }) => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [navigateBackTo, setNavigateBackTo] = useState("");
  const [step, setStep] = useState(1);
  const [lastOpenChat, setLastOpenChat] = useState("");

  return (
    <CommunityChatContext.Provider
      value={{
        isChatOpen,
        setIsChatOpen,
        navigateBackTo,
        setNavigateBackTo,
        step,
        setStep,
        lastOpenChat,
        setLastOpenChat,
      }}
    >
      {children}
    </CommunityChatContext.Provider>
  );
};
