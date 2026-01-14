import React from "react";
import "./Cards.css";
import purpleButterfly from "../../assets/purpleButterfly.jpg"; // adjust path if needed

export default function Cards() {
  return (
    <main className="content">
      <div className="content__inner">
        <h1 className="pageTitle">Color:</h1>

        <div className="grid">
          {Array.from({ length: 10 }).map((_, i) => (
            <div className="card" key={i}>
              <div className="card__img" />
              {/*button */}{" "}
              <img src={purpleButterfly} alt="" className="cardPlaceholder" />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
