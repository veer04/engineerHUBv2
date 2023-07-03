import React from "react";
import { Bucket_URL } from "../../services/APIUtils";
import "./Page404.css";
import { useNavigate } from "react-router-dom";

export default function Page404() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/");
  };
  return (
    <main className="page-404">
      <div
        style={{
          backgroundImage: `url(${Bucket_URL}frontend/maintenance/icon_404.png)`,
        }}
        className="icon-404"
      ></div>
      <h1>The page you were looking for doesn’t exist</h1>
      <p>
        You might have typed in the wrong address or the page has been removed.
        In the, meantime return to home page.
      </p>
      <button onClick={handleClick}>Go back to home page</button>
    </main>
  );
}
