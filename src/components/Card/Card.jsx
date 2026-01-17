import React from "react";
import "./Card.css";
// import purpleButterfly from "../../assets/purpleButterfly.jpg"; // adjust path if needed
//re-style after API

export default function Card({ purpleButterfly, onClick, children }) {
  return (
    <div
      className="card"
      onClick={onClick}
      role={onClick ? "button" : undefined}
    >
      <div className="card__img">
        <img
          src={purpleButterfly}
          alt="butterfly"
          className="cardPlaceholder"
        />
      </div>
      <div className="card__close-btn">X</div>
      <div className="card__hashtags"></div>
    </div>
  );
}
