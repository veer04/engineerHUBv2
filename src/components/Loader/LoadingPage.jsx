import React from "react";
import "./LoadingPage.css";

export default function LoadingPage() {
  return (
    <main className="loading-page">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </main>
  );
}
