import React from "react";
import "./Cards.css";
import Card from "../Card/Card";

export default function Cards({ posts = [], onCardClick, title = "Color:" }) {
  const hasPosts = posts.length > 0;

  return (
    <main className="content">
      <div className="content__inner">
        <h1 className="pageTitle">{title}</h1>

        {!hasPosts ? (
          <p className="cards__empty">No posts yet. Add one to get started.</p>
        ) : (
          <div className="grid">
            {posts.map((post) => (
              <Card
                key={post.id || post._id}
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
