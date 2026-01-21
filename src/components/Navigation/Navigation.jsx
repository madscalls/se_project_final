import React from "react";
import { Link, useLocation } from "react-router-dom";

import bookmark from "../../assets/bookmark.svg";
import Home from "../../assets/Home.svg";
import icon from "../../assets/icon.svg";
import defaultAvatar from "../../assets/avatar.svg";
import "./Navigation.css";

export default function Navigation({ onAddClick, currentUser }) {
  const location = useLocation();
  const isProfilePage = location.pathname === "/profile";

  const avatarSrc = currentUser?.avatarUrl || defaultAvatar;

  return (
    <nav className="topbarActions" aria-label="Primary navigation">
      <button className="iconBtn" aria-label="Saved posts" type="button">
        <img src={bookmark} className="iconBtnImg" alt="Saved Posts" />
      </button>

      <button
        className="iconBtn"
        aria-label="Add post"
        onClick={onAddClick}
        type="button"
      >
        <img src={icon} className="iconBtnImg" alt="Add Post" />
      </button>

      <Link to="/" className="iconBtn" aria-label="Home">
        <img src={Home} className="iconBtnImg" alt="Home" />
      </Link>

      {!isProfilePage && (
        <Link to="/profile" className="iconBtn" aria-label="Profile">
          <img
            src={avatarSrc}
            className="iconBtnImg iconBtnImg--avatar"
            alt="Profile"
          />
        </Link>
      )}
    </nav>
  );
}
