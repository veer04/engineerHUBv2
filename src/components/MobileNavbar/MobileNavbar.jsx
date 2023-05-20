import React from "react";
import "./MobileNavbar.css";
import { HiOutlineUserGroup } from "react-icons/hi";
import { BsBank } from "react-icons/bs";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import { HiOutlineSpeakerphone } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import useNavbar from "../../hooks/use-navbar";

export default function MobileNavbar() {
  const navigate = useNavigate();
  const { selectedPageNavbar, setSelectedPageNavbar } = useNavbar();

  return (
    <div className="mobile-navbar">
      <div
        onClick={() => {
          setSelectedPageNavbar("community");
          navigate("/community");
        }}
        className={`item-container ${
          selectedPageNavbar === "community" ? "is-active" : ""
        }`}
      >
        <HiOutlineUserGroup className="svg" />
        Community
      </div>
      <div
        onClick={() => {
          setSelectedPageNavbar("campus");
          navigate("/campus");
        }}
        className={`item-container ${
          selectedPageNavbar === "campus" ? "is-active" : ""
        }`}
      >
        <BsBank className="svg" />
        Campus
      </div>
      <div
        onClick={() => {
          setSelectedPageNavbar("company");
          navigate("/company");
        }}
        className={`item-container ${
          selectedPageNavbar === "company" ? "is-active" : ""
        }`}
      >
        <HiOutlineBuildingOffice2 className="svg" />
        Company
      </div>
      <div
        onClick={() => {
          setSelectedPageNavbar("host");
          navigate("/hosting");
        }}
        className={`item-container ${
          selectedPageNavbar === "host" ? "is-active" : ""
        }`}
      >
        <HiOutlineSpeakerphone className="svg" />
        Host
      </div>
    </div>
  );
}
