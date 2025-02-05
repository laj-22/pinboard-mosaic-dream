// File: src/components/PinCard.tsx
import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Heart, Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

// Global storage for likes and saved images
const likesStorage = new Set();
const savedStorage = new Set();

export const PinCard = ({ imageUrl, title, author, hashtags = [] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLiked, setIsLiked] = useState(likesStorage.has(imageUrl));
  const [isSaved, setIsSaved] = useState(savedStorage.has(imageUrl));
  const { toast } = useToast();

  const toggleLike = () => {
    if (isLiked) {
      likesStorage.delete(imageUrl);
      toast({ title: "Removed from Likes" });
    } else {
      likesStorage.add(imageUrl);
      toast({ title: "Added to Likes" });
    }
    setIsLiked(!isLiked);
  };

  const toggleSave = () => {
    if (isSaved) {
      savedStorage.delete(imageUrl);
      toast({ title: "Removed from Saved" });
    } else {
      savedStorage.add(imageUrl);
      toast({ title: "Saved Successfully" });
    }
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

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <img src={imageUrl} alt={title} className="w-full rounded-lg" />
          <h2 className="text-xl font-bold mt-4">{title}</h2>
          {author && <p className="text-gray-600">{author}</p>}
          <div className="flex flex-wrap gap-2 mt-4">
            {hashtags.map((tag, index) => (
              <span key={index} className="text-xs bg-gray-100 px-2 py-1 rounded-full">
                #{tag}
              </span>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
