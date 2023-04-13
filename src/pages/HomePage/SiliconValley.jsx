import React from "react";
import "./SiliconValley.css";
import { Bucket_URL } from "../../services/APIUtils";

export default function SiliconValley() {
  const bucket = `${Bucket_URL}frontend/homepage/siliconvalleystreet/`;
  return (
    <div className="silicon-valley-section">
      <img src={`${bucket}silicon_valley_street.png`} alt="Silicon Valley" />
    </div>
  );
}
