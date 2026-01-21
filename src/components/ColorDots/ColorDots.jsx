import React from "react";
import "./ColorDots.css";

export default function ColorDots({ activeColor, onChange }) {
  const colors = ["all", "red", "orange", "yellow", "green", "blue", "purple"];

  return (
    <div className="colorDots" aria-label="Color filters">
      <div className="colorDots__inner">
        {colors.map((c) => (
          <button
            key={c}
            type="button"
            className={`dot dot--${c} ${
              activeColor === c ? "dot--active" : ""
            }`}
            aria-pressed={activeColor === c}
            aria-label={`Filter ${c}`}
            onClick={() => onChange(c)}
          />
        ))}
      </div>
    </div>
  );
}
