import React, { useEffect, useState } from "react";
import Modal from "../Modal/Modal";
import "./EditProfileModal.css";

export default function EditProfileModal({
  isOpen,
  onClose,
  currentUser,
  onSave,
}) {
  const [username, setUsername] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isOpen) return;
    setUsername(currentUser?.username || "");
    setAvatarUrl(currentUser?.avatarUrl || "");
    setError("");
  }, [isOpen, currentUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username.trim()) {
      setError("Username is required.");
      return;
    }

    setError("");

    try {
      await onSave?.({
        username: username.trim(),
        avatarUrl: avatarUrl.trim(),
      });

      onClose();
    } catch (err) {
      setError(err?.message || "Failed to update profile.");
    }
  };

  return (
    <Modal isOpen={isOpen} title="Edit profile" onClose={onClose}>
      <form className="editProfile" onSubmit={handleSubmit}>
        <label className="editProfile__label">
          <span className="editProfile__labelText">Username</span>
          <input
            className="editProfile__input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Your name"
            required
          />
        </label>

        <label className="editProfile__label">
          <span className="editProfile__labelText">Avatar URL</span>
          <input
            className="editProfile__input"
            value={avatarUrl}
            onChange={(e) => setAvatarUrl(e.target.value)}
            placeholder="https://..."
          />
        </label>

        {avatarUrl && (
          <img
            className="editProfile__preview"
            src={avatarUrl}
            alt="Avatar preview"
          />
        )}

        {error && (
          <p className="editProfile__error" role="alert">
            {error}
          </p>
        )}

        <button className="editProfile__save" type="submit">
          Save
        </button>
      </form>
    </Modal>
  );
}
