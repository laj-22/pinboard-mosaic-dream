import { useState } from 'react';
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface PinCardProps {
  imageUrl: string;
  title: string;
  author?: string;
}

export const PinCard = ({ imageUrl, title, author }: PinCardProps) => {
  const [isOpen, setIsOpen] = useState(false);

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
          <h2 className="text-xl font-bold mt-4">{title}</h2>
          {author && <p className="text-gray-600">{author}</p>}
        </DialogContent>
      </Dialog>
    </>
  );
};