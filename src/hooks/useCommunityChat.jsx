import { useContext } from "react";
import { CommunityChatContext } from "../contexts/CommunityChatContext";

export default function useCommunityChat() {
  const {
    isChatOpen,
    setIsChatOpen,
    navigateBackTo,
    setNavigateBackTo,
    step,
    setStep,
  } = useContext(CommunityChatContext);

  return {
    isChatOpen,
    setIsChatOpen,
    navigateBackTo,
    setNavigateBackTo,
    step,
    setStep,
  };
}
