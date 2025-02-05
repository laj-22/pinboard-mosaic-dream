// File: src/components/PinCard.tsx
import { useState, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Heart, Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

// Persistent storage for likes and saved images
const getStoredLikes = () => JSON.parse(localStorage.getItem("likes") || "[]");
const getStoredSaved = () => JSON.parse(localStorage.getItem("saved") || "[]");

export const PinCard = ({ imageUrl, title, author, hashtags = [] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLiked, setIsLiked] = useState(getStoredLikes().includes(imageUrl));
  const [isSaved, setIsSaved] = useState(getStoredSaved().includes(imageUrl));
  const { toast } = useToast();

  useEffect(() => {
    localStorage.setItem("likes", JSON.stringify(getStoredLikes()));
    localStorage.setItem("saved", JSON.stringify(getStoredSaved()));
  }, [isLiked, isSaved]);

  const toggleLike = () => {
    let likes = getStoredLikes();
    if (isLiked) {
      likes = likes.filter((item) => item !== imageUrl);
      toast({ title: "Removed from Likes" });
    } else {
      likes.push(imageUrl);
      toast({ title: "Added to Likes" });
    }
    localStorage.setItem("likes", JSON.stringify(likes));
    setIsLiked(!isLiked);
  };

  const toggleSave = () => {
    let saved = getStoredSaved();
    if (isSaved) {
      saved = saved.filter((item) => item !== imageUrl);
      toast({ title: "Removed from Saved" });
    } else {
      saved.push(imageUrl);
      toast({ title: "Saved Successfully" });
    }
    localStorage.setItem("saved", JSON.stringify(saved));
    setIsSaved(!isSaved);
  };

  return (
    <>
      <div className="relative group" onClick={() => setIsOpen(true)}>
        <img src={imageUrl} alt={title} className="w-full rounded-lg" />
        <div className="absolute top-2 right-2 flex gap-2">
          <button onClick={(e) => { e.stopPropagation(); toggleLike(); }}>
            <Heart className={isLiked ? "text-red-500" : "text-gray-500"} />
          </button>
          <button onClick={(e) => { e.stopPropagation(); toggleSave(); }}>
            <Bookmark className={isSaved ? "text-blue-500" : "text-gray-500"} />
          </button>
        </div>
      </div>
    </>
  );
};
