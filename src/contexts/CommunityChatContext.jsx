import { createContext } from "react";
import { useState } from "react";

export const CommunityChatContext = createContext();

export const CommunityChatProvider = ({ children }) => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [navigateBackTo, setNavigateBackTo] = useState("");
  const [step, setStep] = useState(1);

  return (
    <CommunityChatContext.Provider
      value={{
        isChatOpen,
        setIsChatOpen,
        navigateBackTo,
        setNavigateBackTo,
        step,
        setStep,
      }}
    >
      {children}
    </CommunityChatContext.Provider>
  );
};
