import React from "react";
import "./profile.css";
import defaultAvatar from "../../assets/avatar.svg";
import EditIcon from "../../assets/EditIcon.svg";

export default function Profile({ onEditProfile, currentUser }) {
  const avatarSrc = currentUser?.avatarUrl || defaultAvatar;
  const username = currentUser?.username || "Username";

  return (
    <div className="profile">
      <div className="profile__wrapper">
        <div className="profile__avatar">
          <img
            src={avatarSrc}
            alt={`${username}'s avatar`}
            className="avatar-pic"
          />
        </div>

        <div className="profile__content">
          <button className="profile__button profile__edit">Profile</button>
          <button className="profile__button profile__saved-posts">
            Saved
          </button>

          <button
            className="profile__edit-btn"
            type="button"
            onClick={onEditProfile}
            aria-label="Edit profile"
          >
            <img
              src={EditIcon}
              alt="Edit Profile"
              className="profile__edit-icon"
            />
          </button>

          <span className="profile__border" />

          <p className="profile__text profile__username">{username}</p>
          <p className="profile__text profile__posts-info">1000 posts</p>
        </div>
      </div>
    </div>
  );
}
