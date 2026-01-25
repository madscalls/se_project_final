import React from "react";
import "./Card.css";

export default function Card({
  post,
  imageSrc,
  alt = "",
  onClick,
  showDelete = false,
  onDelete,
  children,
}) {
  const handleDelete = (e) => {
    e.preventDefault();
    e.stopPropagation();
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
          className="card__delete-btn"
          aria-label="Delete post"
          onClick={handleDelete}
        >
          Delete
        </button>
      )}
    </div>
  );
}
