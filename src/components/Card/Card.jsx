import React from "react";
import "./Card.css";
import trashIcon from "../../assets/trash-icon.svg";

export default function Card({
  imageSrc,
  alt = "",
  onClick,
  showDelete = false,
  onDelete,
  children,
}) {
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
          className="card__delete"
          onClick={(e) => {
            e.stopPropagation();
            onDelete?.();
          }}
          aria-label="Delete post"
        >
          <img
            src={trashIcon}
            alt="Delete Button"
            className="card__delete-Icon"
          />
        </button>
      )}
    </div>
  );
}
