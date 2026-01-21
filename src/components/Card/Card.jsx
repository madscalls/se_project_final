import React from "react";
import "./Card.css";

export default function Card({ imageSrc, alt = "", onClick, children }) {
  return (
    <div
      className="card"
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      <div className="card__img">
        <img src={imageSrc} alt={alt} className="cardPlaceholder" />
      </div>

      {children}

      <button type="button" className="card__close-btn" aria-label="Remove">
        ×
      </button>

      <div className="card__hashtags" />
    </div>
  );
}
