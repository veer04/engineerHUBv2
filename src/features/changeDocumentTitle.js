import { useEffect } from "react";

export const changeDocumentTitle = (title) => {
  useEffect(() => {
    document.title = title;
  }, [title]);
};
