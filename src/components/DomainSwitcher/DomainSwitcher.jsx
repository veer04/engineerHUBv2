import React from "react";
import "./DomainSwitcher.css";
import { IoIosArrowDown } from "react-icons/io";

export default function DomainSwitcher() {
  return (
    <aside id="domain-switcher-mobile">
      <button className="active-item">
        <div className="left">
          <div className="logo">
            <img src="" alt="" />
          </div>
          <span>App Development</span>
        </div>
        <div className="logo arrow">
          <IoIosArrowDown />
        </div>
      </button>
    </aside>
  );
}
