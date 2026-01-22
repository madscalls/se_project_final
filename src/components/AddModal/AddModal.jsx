import React, { useState, useEffect, useContext } from "react";
import "./AddModal.css";
import { uploadImage } from "../../utils/api";

import HashIcon from "../../assets/Hash.svg";
import Dropzone from "../Dropzone/Dropzone";
import { AuthContext } from "../../contexts/AuthContext.jsx";

export default function AddModal({ onClose, onAddPost }) {
  const { token } = useContext(AuthContext);

  const colors = ["red", "orange", "yellow", "green", "blue", "purple"];

  const [selectedColor, setSelectedColor] = useState("red");
  const [file, setFile] = useState(null);

  const [hashtags, setHashtags] = useState("");
  const [error, setError] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const [previewUrl, setPreviewUrl] = useState("");

  useEffect(() => {
    if (!file) {
      setPreviewUrl("");
      return;
    }

    const url = URL.createObjectURL(file);
    setPreviewUrl(url);

    return () => URL.revokeObjectURL(url);
  }, [file]);

  useEffect(() => {
    if (file && error) setError("");
  }, [file, error]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isUploading) return;

    if (!token) {
      setError("You must be logged in to upload.");
      return;
    }

    if (!file) {
      setError("Please choose an image first.");
      return;
    }

    setError("");
    setIsUploading(true);

    uploadImage(file, token)
      .then((data) => {
        onAddPost({
          imageUrl: data.url,
          publicId: data.publicId,
          color: selectedColor,
          hashtags: hashtags.trim(),
        });
        onClose();
      })
      .catch((err) =>
        setError(err?.message || "Upload failed. Please try again."),
      )
      .finally(() => setIsUploading(false));
  };

  return (
    <div className="modal" onClick={onClose}>
      <div className="modal__block" onClick={(e) => e.stopPropagation()}>
        <h1 className="modal__title">Add your creativity...</h1>

        <form onSubmit={handleSubmit}>
          <Dropzone
            onFileSelect={setFile}
            previewUrl={previewUrl}
            error={error}
            setError={setError}
          />

          <ul className="modal__inputs">
            <li>
              <button
                className="modal__close-btn"
                type="button"
                onClick={onClose}
                aria-label="Close modal"
                disabled={isUploading}
              >
                ×
              </button>
            </li>

            <li>
              <label className="modal__input_label">
                <div className="modal__Input-Wrapper">
                  <input
                    type="text"
                    className="modal__Input"
                    aria-label="Hashtags"
                    placeholder="#purple #moody #soft"
                    value={hashtags}
                    onChange={(e) => setHashtags(e.target.value)}
                    disabled={isUploading}
                  />
                  <img src={HashIcon} alt="HashTag" className="HashIcon" />
                </div>
              </label>
            </li>

            <li className="modal__group">
              <div className="colorRadios">
                {colors.map((color) => (
                  <label
                    key={color}
                    className={`colorRadio colorRadio--${color}`}
                  >
                    <input
                      type="radio"
                      name="postColor"
                      value={color}
                      className="colorRadio__input"
                      checked={selectedColor === color}
                      onChange={() => setSelectedColor(color)}
                      disabled={isUploading}
                    />
                    <span className="colorRadio__dot" />
                  </label>
                ))}
              </div>
            </li>

            <li>
              <button
                className="modal__submit-btn"
                type="submit"
                disabled={isUploading || !file}
              >
                {isUploading ? "Uploading..." : "Add post"}
              </button>
            </li>

            <li>
              <button
                className="modal__cancel-btn"
                type="button"
                onClick={onClose}
                disabled={isUploading}
              >
                Cancel
              </button>
            </li>
          </ul>
        </form>
      </div>
    </div>
  );
}
