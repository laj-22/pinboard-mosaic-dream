import { useState, useEffect } from "react";
import { Heart, Bookmark } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const getStoredLikes = () => JSON.parse(localStorage.getItem("likes") || "[]");
const getStoredSaved = () => JSON.parse(localStorage.getItem("saved") || "[]");
const setStoredLikes = (likes) => localStorage.setItem("likes", JSON.stringify(likes));
const setStoredSaved = (saved) => localStorage.setItem("saved", JSON.stringify(saved));

export const PinCard = ({ imageUrl, title, author, hashtags = [] }) => {
  const [likes, setLikes] = useState(getStoredLikes());
  const [saved, setSaved] = useState(getStoredSaved());
  const isLiked = likes.includes(imageUrl);
  const isSaved = saved.includes(imageUrl);
  const { toast } = useToast();

  useEffect(() => {
    setStoredLikes(likes);
    setStoredSaved(saved);
  }, [likes, saved]);

  const toggleLike = () => {
    const updatedLikes = isLiked ? likes.filter((item) => item !== imageUrl) : [...likes, imageUrl];
    setLikes(updatedLikes);
    toast({ title: isLiked ? "Removed from Likes" : "Added to Likes" });
  };

  const toggleSave = () => {
    const updatedSaved = isSaved ? saved.filter((item) => item !== imageUrl) : [...saved, imageUrl];
    setSaved(updatedSaved);
    toast({ title: isSaved ? "Removed from Saved" : "Saved Successfully" });
  };

  return (
    <div className="relative group">
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
  );
};
