import { useState, useEffect } from "react";

const getStoredLikes = () => JSON.parse(localStorage.getItem("likes") || "[]");

export const Likes = () => {
  const [likes, setLikes] = useState([]);

  useEffect(() => {
    setLikes(getStoredLikes());
  }, []);

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">Liked Images</h1>
      {likes.length === 0 ? (
        <p>No liked images yet.</p>
      ) : (
        <div className="grid grid-cols-3 gap-2">
          {likes.map((img, index) => (
            <img key={index} src={img} alt="Liked" className="rounded-lg" />
          ))}
        </div>
      )}
    </div>
  );
};
