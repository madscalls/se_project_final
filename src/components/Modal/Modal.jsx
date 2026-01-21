import React, { useEffect } from "react";
import "./Modal.css";

export default function Modal({ isOpen, title, onClose, children }) {
  useEffect(() => {
    if (!isOpen) return;
    const handleEsc = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="modal" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal__block" onClick={(e) => e.stopPropagation()}>
        {title && <h2 className="modal__title">{title}</h2>}
        <button className="modal__close-btn" type="button" onClick={onClose}>
          ×
        </button>
        {children}
      </div>
    </div>
  );
}
