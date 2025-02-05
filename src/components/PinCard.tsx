
import { useState, useRef } from 'react';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Heart, Bookmark, ArrowLeft, Upload, RefreshCw } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface PinCardProps {
  imageUrl: string;
  title: string;
  author?: string;
  hashtags?: string[];
  onImageClick?: () => void;
}

export const PinCard = ({ imageUrl, title, author, hashtags = [], onImageClick }: PinCardProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [currentImage, setCurrentImage] = useState(imageUrl);
  const [isLoading, setIsLoading] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleImageError = () => {
    toast({
      title: "Image Error",
      description: "Failed to load image. Please try again later.",
      variant: "destructive",
    });
    setIsLoading(false);
  };

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type and size
      const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
      const maxSize = 5 * 1024 * 1024; // 5MB

      if (!validTypes.includes(file.type)) {
        toast({
          title: "Invalid File Type",
          description: "Please upload only JPG, PNG, or GIF images.",
          variant: "destructive",
        });
        return;
      }

      if (file.size > maxSize) {
        toast({
          title: "File Too Large",
          description: "Please upload images smaller than 5MB.",
          variant: "destructive",
        });
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setCurrentImage(reader.result as string);
        toast({
          title: "Image Updated",
          description: "Your image has been successfully updated!",
          variant: "default",
        });
      };
      reader.onerror = () => {
        toast({
          title: "Upload Failed",
          description: "Failed to upload image. Please try again.",
          variant: "destructive",
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleCardClick = () => {
    setIsOpen(true);
    onImageClick?.();
  };

  return (
    <>
      <div 
        className="relative group animate-fade-in rounded-lg overflow-hidden cursor-zoom-in mb-4"
        onClick={handleCardClick}
      >
        {isLoading && (
          <div className="absolute inset-0 bg-gray-100 animate-pulse"></div>
        )}
        <img
          src={currentImage}
          alt={title}
          className="w-full object-cover rounded-lg transition-transform duration-200 group-hover:scale-105"
          onError={handleImageError}
          onLoad={handleImageLoad}
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200">
          <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-200">
            <h3 className="font-bold text-lg">{title}</h3>
            {author && <p className="text-sm">{author}</p>}
            <div className="flex flex-wrap gap-2 mt-2">
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
        <DialogContent className="max-w-3xl mx-auto w-[90%]">
          <div className="flex items-center justify-between mb-4">
            <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-gray-100 rounded-full">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={triggerFileInput}>
                <Upload className="w-4 h-4 mr-2" />
                Upload New
              </Button>
              <Button variant="outline" size="sm" onClick={triggerFileInput}>
                <RefreshCw className="w-4 h-4 mr-2" />
                Replace
              </Button>
            </div>
          </div>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageUpload}
            accept="image/*"
            className="hidden"
          />
          <img
            src={currentImage}
            alt={title}
            className="w-full h-auto rounded-lg max-h-[70vh] object-contain"
            onError={handleImageError}
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
                  toast({
                    title: isLiked ? "Removed from Likes" : "Added to Likes",
                    description: isLiked ? "Image removed from your likes" : "Image added to your likes",
                  });
                }}
                className={`p-2 rounded-full ${isLiked ? 'text-red-500' : 'text-gray-500'} hover:bg-gray-100`}
              >
                <Heart className={isLiked ? 'fill-current' : ''} />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsSaved(!isSaved);
                  toast({
                    title: isSaved ? "Removed from Saved" : "Saved",
                    description: isSaved ? "Image removed from saved items" : "Image saved successfully",
                  });
                }}
                className={`p-2 rounded-full ${isSaved ? 'text-blue-500' : 'text-gray-500'} hover:bg-gray-100`}
              >
                <Bookmark className={isSaved ? 'fill-current' : ''} />
              </button>
            </div>
          </div>
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
