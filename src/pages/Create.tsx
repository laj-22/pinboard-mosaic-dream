// File: src/pages/Create.tsx
import { useState } from "react";
import { savedStorage } from "@/components/PinCard";

export const Create = () => {
  const [boardName, setBoardName] = useState("");
  const [selectedImages, setSelectedImages] = useState([]);
  const [showSaved, setShowSaved] = useState(false);

  const handleCreateBoard = () => {
    if (!boardName) return alert("Please enter a board name");
    console.log("Board Created:", boardName, "Images:", selectedImages);
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">Create a New Board</h1>
      <input
        type="text"
        value={boardName}
        onChange={(e) => setBoardName(e.target.value)}
        placeholder="Enter board name"
        className="border p-2 rounded w-full mb-4"
      />
      <div className="mb-4">
        <button className="mr-2 p-2 bg-gray-200 rounded" onClick={() => setShowSaved(false)}>Upload New</button>
        <button className="p-2 bg-gray-200 rounded" onClick={() => setShowSaved(true)}>Select from Saved</button>
      </div>
      {showSaved ? (
        <div className="grid grid-cols-3 gap-2">
          {[...savedStorage].map((img, index) => (
            <img
              key={index}
              src={img}
              alt="Saved"
              className={`cursor-pointer rounded-lg ${selectedImages.includes(img) ? "border-2 border-blue-500" : ""}`}
              onClick={() => setSelectedImages(selectedImages.includes(img) ? selectedImages.filter(i => i !== img) : [...selectedImages, img])}
            />
          ))}
        </div>
      ) : (
        <input type="file" accept="image/*" className="border p-2 rounded w-full" onChange={(e) => setSelectedImages([URL.createObjectURL(e.target.files[0])])} />
      )}
      <button onClick={handleCreateBoard} className="mt-4 p-2 bg-blue-500 text-white rounded w-full">Create Board</button>
    </div>
  );
};
