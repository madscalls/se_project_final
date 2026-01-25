import React from "react";
import "./Card.css";

export default function Card({
  imageSrc,
  alt = "",
  onClick,
  children,
  showDelete = false,
  onDelete,
}) {
  const handleDelete = (e) => {
    e.stopPropagation(); // prevents triggering the card onClick
    onDelete?.();
  };

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

      {showDelete && (
        <button
          type="button"
          className="card__close-btn"
          aria-label="Delete post"
          onClick={handleDelete}
        >
          ×
        </button>
      )}

      <div className="card__hashtags" />
    </div>
  );
}
