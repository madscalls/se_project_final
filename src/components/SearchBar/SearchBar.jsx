import React from "react";
import "./SearchBar.css";
import searchIcon from "../../assets/searchIcon.svg";
import BarChart from "../../assets/BarChart.svg";

export default function SearchBar({
  value,
  onChange,
  placeholder = "Search...",
}) {
  return (
    <div className="searchBarWrapper">
      <img src={BarChart} alt="" className="searchBarDecal" />
      <input
        className="searchBar"
        type="search"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <img
        src={searchIcon}
        alt=""
        aria-hidden="true"
        className="searchBarIcon"
      />
    </div>
  );
}
