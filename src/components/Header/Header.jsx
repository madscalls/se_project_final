import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";

import SearchBar from "../SearchBar/SearchBar";
import Navigation from "../Navigation/Navigation";

export default function Header({ onAddClick, currentUser }) {
  return (
    <header className="topbar">
      <div className="topbar__inner">
        <div className="Searchbar">
          <SearchBar placeholder="Explore..." />
        </div>
        <Link to="/" className="logo">
          ic<span className="logoDot">.</span>
        </Link>

        <Navigation onAddClick={onAddClick} currentUser={currentUser} />
      </div>
    </header>
  );
}
