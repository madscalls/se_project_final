import React from "react";
import "./LoginDotsBackdrop.css";

export default function LoginDotsBackdrop({ tint = "purple" }) {
  const colors = ["red", "orange", "yellow", "green", "blue", "purple"];

  return (
    <div className={`loginDots loginDots--${tint}`} aria-hidden="true">
      <div className="loginDots__inner">
        {colors.map((c) => (
          <span key={c} className={`loginDots__dot loginDots__dot--${c}`} />
        ))}
      </div>
    </div>
  );
}
