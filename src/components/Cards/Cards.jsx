import React from "react";
import "./Cards.css";
import Card from "../Card/Card";

function formatColorLabel(color) {
  if (!color || color === "all") return "All";
  return color.charAt(0).toUpperCase() + color.slice(1);
}

export default function Cards({
  posts = [],
  onCardClick,
  activeColor = "all",
  title,
}) {
  const hasPosts = posts.length > 0;

  const pageTitle = title ?? `Color: ${formatColorLabel(activeColor)}`;

  return (
    <main className="content">
      <div className="content__inner">
        <h1 className="pageTitle">{pageTitle}</h1>

        {!hasPosts ? (
          <p className="cards__empty">No posts yet. Add one to get started.</p>
        ) : (
          <div className="grid">
            {posts.map((post) => (
              <Card
                key={post._id || post.id}
                imageSrc={post.imageUrl}
                alt={post.alt || post.hashtags || "Uploaded image"}
                onClick={() => onCardClick?.(post)}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
