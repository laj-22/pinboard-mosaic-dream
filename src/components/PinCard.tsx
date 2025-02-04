import { useState } from 'react';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Heart, Bookmark } from 'lucide-react';

interface PinCardProps {
  imageUrl: string;
  title: string;
  author?: string;
  hashtags?: string[];
}

export const PinCard = ({ imageUrl, title, author, hashtags = [] }: PinCardProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  return (
    <>
      <div 
        className="relative group animate-fade-in rounded-lg overflow-hidden cursor-zoom-in mb-4"
        onClick={() => setIsOpen(true)}
      >
        <img
          src={imageUrl}
          alt={title}
          className="w-full object-cover rounded-lg transition-transform duration-200 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200">
          <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-200">
            <h3 className="font-bold text-lg">{title}</h3>
            {author && <p className="text-sm">{author}</p>}
            <div className="flex gap-2 mt-2">
              {hashtags.map((tag, index) => (
                <span key={index} className="text-xs bg-black bg-opacity-50 px-2 py-1 rounded-full">
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-4xl">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-auto rounded-lg"
          />
          <div className="flex justify-between items-center mt-4">
            <div>
              <h2 className="text-xl font-bold">{title}</h2>
              {author && <p className="text-gray-600">{author}</p>}
            </div>
            <div className="flex gap-4">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsLiked(!isLiked);
                }}
                className={`p-2 rounded-full ${isLiked ? 'text-red-500' : 'text-gray-500'} hover:bg-gray-100`}
              >
                <Heart className={isLiked ? 'fill-current' : ''} />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsSaved(!isSaved);
                }}
                className={`p-2 rounded-full ${isSaved ? 'text-blue-500' : 'text-gray-500'} hover:bg-gray-100`}
              >
                <Bookmark className={isSaved ? 'fill-current' : ''} />
              </button>
            </div>
          </div>
          <div className="flex gap-2 mt-4">
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