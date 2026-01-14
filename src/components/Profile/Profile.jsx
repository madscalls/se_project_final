import React from "react";
import "./profile.css";
import avatar from "../../assets/avatar.svg";
import EditIcon from "../../assets/EditIcon.svg";
export default function Profile() {
  return (
    <div className="profile">
      <div className="profile__wrapper">
        <div className="profile__avatar">
          <img src={avatar} alt="" className="avatar-pic" />
        </div>
        <div className="profile__content">
          <button className="profile__button profile__edit">Profile</button>
          <button className="profile__button profile__saved-posts">
            Saved
          </button>
          <button className="profile__edit-btn">
            <img
              src={EditIcon}
              alt="Edit Profile"
              className="profile__edit-icon"
            />
          </button>
          <span className="profile__border"></span>
          <p className="profile__text profile__username">Username</p>
          <p className="profile__text profile__posts-info">1000 posts</p>
        </div>
      </div>
    </div>
  );
}
