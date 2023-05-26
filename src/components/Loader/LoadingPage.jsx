import React from "react";
import "./LoadingPage.css";

export default function LoadingPage() {
  return (
    <div className="loading-page">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  );
}
