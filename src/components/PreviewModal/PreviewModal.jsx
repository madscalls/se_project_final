import React from "react";
import Modal from "../Modal/Modal";
import "./PreviewModal.css";

export default function PreviewModal({ isOpen, onClose, post }) {
  if (!post) return null;

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
        {post.hashtags && <p className="preview__tags">{post.hashtags}</p>}
      </div>
    </Modal>
  );
}
