import React from "react";
import "./Cards.css";
import Card from "../Card/Card"; // adjust path
import purpleButterfly from "../../assets/purpleButterfly.jpg";
//re-style after API
export default function Cards() {
  const items = Array.from({ length: 10 }).map((_, i) => ({
    id: i,
    src: purpleButterfly,
    alt: `Card ${i + 1}`,
  }));

  return (
    <main className="content">
      <div className="content__inner">
        <h1 className="pageTitle">Color:</h1>

        <div className="grid">
          {items.map((item) => (
            <Card
              key={item.id}
              imageSrc={purpleButterfly}
              // imageSrc={item.src}
              alt={item.alt}
              onClick={() => console.log("clicked", item.id)}
            >
              {/* Example overlay (optional) */}
              {/* <button className="card__action">Save</button> */}
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
}
