import React from "react";
import "./CampusPage.css";
import { BiFilter } from "react-icons/bi";
import { HiOutlineSearch } from "react-icons/hi";
import SearchBar from "../../components/SearchBar/SearchBar";

export default function CampusPage() {
  return (
    <div className="campus-page">
      <h1 className="heading-3">Campus</h1>
      <h2 className="subheading-1">
        Lorem ipsum dolor sit amet consectetur. Vitae diam facilisi libero
        mauris mauris quam elit. Convallis nunc accumsan sit cum. Vitae diam eu
        enim dignissim donec ultrices dis amet ipsum.
      </h2>
      <div className="campus-page__search-bar">
        <SearchBar
          hasFiltration={true}
          placeholder="You are looking for which Campus?"
          type="text"
        />
      </div>
    </div>
  );
}
