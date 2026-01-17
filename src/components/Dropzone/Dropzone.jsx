import React, { useRef, useState } from "react";
import "./Dropzone.css";
import camera from "../../assets/camera.svg";
import star from "../../assets/Star.svg";

const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];
const MAX_SIZE_BYTES = 8 * 1024 * 1024; // 8MB

export default function Dropzone({
  onFileSelect,
  previewUrl,
  error,
  setError,
}) {
  const inputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  const validateFile = (file) => {
    if (!file) return false;

    if (!ACCEPTED_TYPES.includes(file.type)) {
      setError?.("Please upload a JPG, PNG, WEBP, or GIF.");
      return false;
    }

    if (file.size > MAX_SIZE_BYTES) {
      setError?.("File is too large. Max size is 8MB.");
      return false;
    }

    setError?.("");
    return true;
  };

  const handleFile = (file) => {
    if (!validateFile(file)) return;
    onFileSelect(file);
  };

  const handleInputChange = (e) => {
    const file = e.target.files?.[0];
    handleFile(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];
    handleFile(file);
  };

  return (
    <div className="dropzone">
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="dropzone__input"
        onChange={handleInputChange}
      />

      <div
        className={`dropzone__box ${
          isDragging ? "dropzone__box_dragging" : ""
        }`}
        onClick={() => inputRef.current?.click()}
        onDragEnter={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragOver={(e) => e.preventDefault()}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") inputRef.current?.click();
        }}
      >
        {previewUrl ? (
          <img src={previewUrl} alt="Preview" className="dropzone__preview" />
        ) : (
          <>
            <p className="dropzone__title">Drag & drop your pixels here</p>
            <p className="dropzone__subtitle">or click to browse</p>
            <img src={star} alt="star" className="dropzone__star1" />
            <img src={star} alt="star" className="dropzone__star2" />
            <img src={camera} alt="photo" className="dropbox__camera" />

            <img src={star} alt="star" className="dropzone__star3" />
            <img src={star} alt="star" className="dropzone__star4" />
            <img src={star} alt="star" className="dropzone__star5" />
            <p className="dropzone__hint">JPG, PNG, WEBP, GIF • max 8MB</p>
          </>
        )}
      </div>

      {error ? <p className="dropzone__error">{error}</p> : null}
    </div>
  );
}
