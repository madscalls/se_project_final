import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";

import SearchBar from "../SearchBar/SearchBar";
import Navigation from "../Navigation/Navigation";

export default function Header({
  onAddClick,
  currentUser,
  onLogout,
  query,
  onQueryChange,
}) {
  return (
    <header className="topbar">
      <div className="topbar__inner">
        <div className="Searchbar">
          <SearchBar
            placeholder="Explore..."
            value={query}
            onChange={onQueryChange}
          />
        </div>

        <Link to="/" className="logo">
          ic.
        </Link>

        <Navigation onAddClick={onAddClick} currentUser={currentUser} />

        <button className="header__logout" type="button" onClick={onLogout}>
          Log out
        </button>
      </div>
    </header>
  );
}
