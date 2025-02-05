
import { PinCard } from './PinCard';
import { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Categories with their associated pins
const TRENDING_CATEGORIES = {
  cars: [
    {
      imageUrl: "https://images.unsplash.com/photo-1487887235947-a955ef187fcc",
      title: "Classic Cars",
      author: "Auto Enthusiast",
      hashtags: ["cars", "classic", "vintage"]
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7",
      title: "Vintage Automobile",
      author: "Car Collector",
      hashtags: ["cars", "vintage", "automotive"]
    }
  ],
  houses: [
    {
      imageUrl: "https://images.unsplash.com/photo-1487958449943-2429e8be8625",
      title: "Modern Houses",
      author: "Architecture Today",
      hashtags: ["modern", "architecture", "house"]
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9",
      title: "Contemporary Home",
      author: "Home Design",
      hashtags: ["modern", "home", "design"]
    }
  ],
  watches: [
    {
      imageUrl: "https://images.unsplash.com/photo-1434494878577-86c23bcb06b9",
      title: "Luxury Watches",
      author: "Time Keeper",
      hashtags: ["watches", "luxury", "timepiece"]
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1524592094714-0f0654e20314",
      title: "Classic Timepiece",
      author: "Watch Collector",
      hashtags: ["watches", "classic", "luxury"]
    }
  ],
  environment: [
    {
      imageUrl: "https://images.unsplash.com/photo-1472396961693-142e6e269027",
      title: "Nature & Environment",
      author: "Nature Explorer",
      hashtags: ["nature", "environment", "outdoors"]
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e",
      title: "Forest Scene",
      author: "Nature Photography",
      hashtags: ["nature", "forest", "environment"]
    }
  ],
  technology: [
    {
      imageUrl: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
      title: "Technology",
      author: "Tech Insider",
      hashtags: ["tech", "gadgets", "innovation"]
    }
  ],
  wildlife: [
    {
      imageUrl: "https://images.unsplash.com/photo-1517022812141-23620dba5c23",
      title: "Wildlife",
      author: "Animal Planet",
      hashtags: ["animals", "wildlife", "nature"]
    }
  ]
};

export const MasonryGrid = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { toast } = useToast();
  
  const handleImageClick = (hashtags: string[]) => {
    // Find related images based on hashtags
    const relatedImages = Object.values(TRENDING_CATEGORIES)
      .flat()
      .filter(pin => 
        pin.hashtags.some(tag => hashtags.includes(tag))
      );
    
    if (relatedImages.length > 0) {
      toast({
        title: "Related Images Found",
        description: "Showing similar content based on your selection",
      });
    }
  };

  const allPins = Object.values(TRENDING_CATEGORIES).flat();
  
  return (
    <div className="container mx-auto px-4 py-8">
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="mb-8">
          <TabsTrigger value="all">All Trending</TabsTrigger>
          {Object.keys(TRENDING_CATEGORIES).map((category) => (
            <TabsTrigger key={category} value={category}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="all">
          <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-4">
            {allPins.map((pin, index) => (
              <PinCard
                key={index}
                imageUrl={pin.imageUrl}
                title={pin.title}
                author={pin.author}
                hashtags={pin.hashtags}
                onImageClick={() => handleImageClick(pin.hashtags)}
              />
            ))}
          </div>
        </TabsContent>

        {Object.entries(TRENDING_CATEGORIES).map(([category, pins]) => (
          <TabsContent key={category} value={category}>
            <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-4">
              {pins.map((pin, index) => (
                <PinCard
                  key={index}
                  imageUrl={pin.imageUrl}
                  title={pin.title}
                  author={pin.author}
                  hashtags={pin.hashtags}
                  onImageClick={() => handleImageClick(pin.hashtags)}
                />
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};
