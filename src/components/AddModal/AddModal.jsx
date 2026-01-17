import React from "react";
import { useState } from "react";
import "./AddModal.css";

import HashIcon from "../../assets/Hash.svg";
import Dropzone from "../Dropzone/Dropzone";

export default function AddModal({ onClose }) {
  const [selectedColor, setSelectedColor] = useState("red");

  const colors = ["red", "orange", "yellow", "green", "blue", "purple"];

  return (
    <div className="modal" onClick={onClose}>
      <div className="modal__block" onClick={(e) => e.stopPropagation()}>
        <h1 className="modal__title">Add your creativity...</h1>
        <Dropzone />
        <ul className="modal__inputs">
          <li>
            <button
              className="modal__close-btn"
              type="button"
              onClick={onClose}
              aria-label="close modal"
            >
              X
            </button>
          </li>
          <li>
            <label className="modal__input_label">
              <div className="modal__Input-Wrapper">
                <input
                  type="text"
                  className="modal__Input"
                  aria-label="Hashtags"
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
                  />
                  <span className="colorRadio__dot" />
                </label>
              ))}
            </div>
          </li>

          <li>
            <button className="modal__submit-btn" type="button">
              Add post
            </button>
          </li>

          <li>
            <button
              className="modal__cancel-btn"
              type="button"
              onClick={onClose}
            >
              Cancel
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}
