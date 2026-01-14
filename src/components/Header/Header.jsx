import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";

import bookmark from "../../assets/bookmark.svg";
import Home from "../../assets/Home.svg";
import icon from "../../assets/icon.svg";
import SearchBar from "../SearchBar/SearchBar";

export default function Header({ onAddClick }) {
  return (
    <header className="topbar">
      <div className="topbar__inner">
        <div className="Searchbar">
          <SearchBar placeholder="Explore..." />
        </div>
        <Link to="/" className="logo">
          ic<span className="logoDot">.</span>
        </Link>

        <nav className="topbarActions">
          <button className="iconBtn" aria-label="Saved posts" type="button">
            <img src={bookmark} className="iconBtnImg" alt="Saved Posts" />
          </button>
          <button
            className="iconBtn"
            aria-label="Add post"
            onClick={onAddClick}
            type="button"
          >
            <img src={icon} className="iconBtnImg" alt="Saved Posts" />
          </button>
          <Link to="/" className="iconBtn" aria-label="Home">
            <img src={Home} className="iconBtnImg" alt="Home" />
          </Link>

          <button className="iconBtn" aria-label="Profile" type="button">
            <Link to="/profile" className="iconBtn" aria-label="Profile">
              👤
            </Link>
          </button>
        </nav>
      </div>
    </header>
  );
}
