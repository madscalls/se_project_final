import React from "react";
import Modal from "../Modal/Modal";
import "./PreviewModal.css";

export default function PreviewModal({ isOpen, onClose, post }) {
  if (!post) return null;

  const tags = Array.isArray(post.hashtags) ? post.hashtags : [];

  return (
    <Modal
      isOpen={isOpen}
      title={post.color ? `Color: ${post.color}` : ""}
      onClose={onClose}
    >
      <div className="preview">
        <img
          className="preview__img"
          src={post.imageUrl}
          alt={post.alt || "Post preview"}
        />

        {tags.length > 0 && (
          <div className="preview__tags">
            {tags.map((t) => (
              <span key={t} className="tag">
                #{t}
              </span>
            ))}
          </div>
        )}
      </div>
    </Modal>
  );
}
