import { useState, useEffect } from "react";
import { PinCard } from "@/components/PinCard";

const getStoredSaved = () => JSON.parse(localStorage.getItem("saved") || "[]");

export const Index = () => {
  const [savedImages, setSavedImages] = useState([]);

  useEffect(() => {
    setSavedImages(getStoredSaved());
  }, []);

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">Saved Images</h1>
      {savedImages.length === 0 ? (
        <p>No saved images yet.</p>
      ) : (
        <div className="grid grid-cols-3 gap-2">
          {savedImages.map((img, index) => (
            <PinCard key={index} imageUrl={img} />
          ))}
        </div>
      )}
    </div>
  );
};

