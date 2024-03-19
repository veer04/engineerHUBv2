import { useEffect } from "react";

export const changeDocumentTitle = (title) => {
  useEffect(() => {
    document.title = title;

    return () => {
      document.title = "engineerHUB";
    };
  }, [title]);
};
