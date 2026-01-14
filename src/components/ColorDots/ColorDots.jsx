import React from "react";
import "./ColorDots.css";

export default function ColorDots() {
  const colors = ["red", "orange", "yellow", "green", "blue", "purple"];

  return (
    <div className="colorDots" aria-label="Color filters">
      <div className="colorDots__inner">
        {colors.map((c) => (
          <button
            key={c}
            className={`dot dot--${c}`}
            aria-label={c}
            type="button"
          />
        ))}
      </div>
    </div>
  );
}
