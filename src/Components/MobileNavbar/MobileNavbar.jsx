import React from "react";
import "./MobileNavbar.css";
import { HiOutlineUserGroup } from "react-icons/hi";
import { BsBank } from "react-icons/bs";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import { HiOutlineSpeakerphone } from "react-icons/hi";
import useMobileNavbar from "../../hooks/use-mobileNavbar";
import { useNavigate } from "react-router-dom";

export default function MobileNavbar() {
  const navigate = useNavigate();

  const { selectedPage, setSelectedPage } = useMobileNavbar();

  return (
    <div className="mobile-navbar">
      <div
        onClick={() => {
          setSelectedPage("community");
          navigate("/community");
        }}
        className={`item-container ${
          selectedPage === "community" ? "is-active" : ""
        }`}
      >
        <HiOutlineUserGroup className="svg" />
        Community
      </div>
      <div
        onClick={() => {
          setSelectedPage("campus");
          navigate("/campus");
        }}
        className={`item-container ${
          selectedPage === "campus" ? "is-active" : ""
        }`}
      >
        <BsBank className="svg" />
        Campus
      </div>
      <div
        onClick={() => {
          setSelectedPage("company");
          navigate("/company");
        }}
        className={`item-container ${
          selectedPage === "company" ? "is-active" : ""
        }`}
      >
        <HiOutlineBuildingOffice2 className="svg" />
        Company
      </div>
      <div
        onClick={() => {
          setSelectedPage("host");
          navigate("/hosting");
        }}
        className={`item-container ${
          selectedPage === "host" ? "is-active" : ""
        }`}
      >
        <HiOutlineSpeakerphone className="svg" />
        Host
      </div>
    </div>
  );
}
