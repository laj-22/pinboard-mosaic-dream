```typescript
import { PinCard } from './PinCard';
import { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";

// Categories with their associated pins
const TRENDING_CATEGORIES = {
  cars: [
    // Green Porsche Cars (10)
    {
      imageUrl: "https://images.unsplash.com/photo-1503376780353-7e6692767b70",
      title: "Green Porsche 911",
      author: "Porsche Enthusiast",
      hashtags: ["porsche", "green", "911"]
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d",
      title: "Mint Green Porsche Cayman",
      author: "Car Photographer",
      hashtags: ["porsche", "green", "cayman"]
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1514316454349-750a7fd3da3a",
      title: "Forest Green Porsche GT3",
      author: "Automotive Gallery",
      hashtags: ["porsche", "green", "GT3"]
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1503376780353-7e6692767b70",
      title: "Emerald Porsche Turbo",
      author: "Sports Car Weekly",
      hashtags: ["porsche", "green", "turbo"]
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8",
      title: "Sage Green Porsche Classic",
      author: "Vintage Cars",
      hashtags: ["porsche", "green", "classic"]
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1494905998402-395d579af36f",
      title: "Racing Green Porsche",
      author: "Track Day Photos",
      hashtags: ["porsche", "green", "racing"]
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1503376780353-7e6692767b70",
      title: "Olive Green Porsche",
      author: "Car Collector",
      hashtags: ["porsche", "green", "vintage"]
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8",
      title: "Limited Edition Green Porsche",
      author: "Luxury Cars",
      hashtags: ["porsche", "green", "limited"]
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1494905998402-395d579af36f",
      title: "Custom Green Porsche",
      author: "Custom Shop",
      hashtags: ["porsche", "green", "custom"]
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1503376780353-7e6692767b70",
      title: "Heritage Green Porsche",
      author: "Classic Cars",
      hashtags: ["porsche", "green", "heritage"]
    },
    // Random Cars (10)
    {
      imageUrl: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7",
      title: "Vintage Mercedes",
      author: "Classic Cars",
      hashtags: ["mercedes", "vintage", "luxury"]
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1583121274602-3e2820c69888",
      title: "Ferrari Racing",
      author: "Sports Cars",
      hashtags: ["ferrari", "racing", "sports"]
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98",
      title: "Classic Mustang",
      author: "American Muscle",
      hashtags: ["mustang", "classic", "muscle"]
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d",
      title: "Modern Lamborghini",
      author: "Supercar Spotting",
      hashtags: ["lamborghini", "modern", "supercar"]
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1542362567-b07e54358753",
      title: "Electric Tesla",
      author: "EV Enthusiast",
      hashtags: ["tesla", "electric", "modern"]
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1553440569-bcc63803a83d",
      title: "Vintage Volkswagen",
      author: "Classic VW",
      hashtags: ["volkswagen", "vintage", "classic"]
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1554744512-d6c603f27c54",
      title: "BMW M Series",
      author: "German Cars",
      hashtags: ["bmw", "mseries", "performance"]
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1503376780353-7e6692767b70",
      title: "Aston Martin DB5",
      author: "British Classics",
      hashtags: ["astonmartin", "classic", "british"]
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8",
      title: "McLaren P1",
      author: "Hypercar Photos",
      hashtags: ["mclaren", "hypercar", "modern"]
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1494905998402-395d579af36f",
      title: "Jaguar E-Type",
      author: "Classic British",
      hashtags: ["jaguar", "classic", "british"]
    }
  ],
  houses: [
    // Classic Houses (10)
    {
      imageUrl: "https://images.unsplash.com/photo-1480074568708-e7b720bb3f09",
      title: "Victorian Manor",
      author: "Classic Homes",
      hashtags: ["victorian", "classic", "mansion"]
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1518780664697-55e3ad937233",
      title: "Tudor Estate",
      author: "Heritage Homes",
      hashtags: ["tudor", "classic", "estate"]
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1449844908441-8829872d2607",
      title: "Colonial Home",
      author: "American Heritage",
      hashtags: ["colonial", "classic", "american"]
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae",
      title: "Georgian Mansion",
      author: "Period Properties",
      hashtags: ["georgian", "classic", "mansion"]
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6",
      title: "Queen Anne Villa",
      author: "Victorian Homes",
      hashtags: ["queenanne", "classic", "villa"]
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1518780664697-55e3ad937233",
      title: "Edwardian House",
      author: "Period Homes",
      hashtags: ["edwardian", "classic", "heritage"]
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1449844908441-8829872d2607",
      title: "Greek Revival",
      author: "Classical Architecture",
      hashtags: ["greek", "classic", "revival"]
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae",
      title: "Italianate Villa",
      author: "European Style",
      hashtags: ["italianate", "classic", "villa"]
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6",
      title: "French Chateau",
      author: "Luxury Estates",
      hashtags: ["french", "classic", "chateau"]
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1518780664697-55e3ad937233",
      title: "Gothic Revival",
      author: "Historic Homes",
      hashtags: ["gothic", "classic", "revival"]
    },
    // Modern Houses (5)
    {
      imageUrl: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9",
      title: "Contemporary Minimalist",
      author: "Modern Design",
      hashtags: ["modern", "minimalist", "contemporary"]
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750",
      title: "Glass House",
      author: "Modern Architecture",
      hashtags: ["modern", "glass", "minimal"]
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1523217582562-09d0def993a6",
      title: "Eco Modern",
      author: "Sustainable Living",
      hashtags: ["modern", "eco", "sustainable"]
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
      title: "Urban Modern",
      author: "City Living",
      hashtags: ["modern", "urban", "contemporary"]
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3",
      title: "Smart Home",
      author: "Tech Houses",
      hashtags: ["modern", "smart", "tech"]
    },
    // Other Houses (5)
    {
      imageUrl: "https://images.unsplash.com/photo-1572120360610-d971b9d7767c",
      title: "Mountain Retreat",
      author: "Mountain Homes",
      hashtags: ["mountain", "retreat", "cabin"]
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1523217582562-09d0def993a6",
      title: "Beach House",
      author: "Coastal Living",
      hashtags: ["beach", "coastal", "vacation"]
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
      title: "Desert Oasis",
      author: "Desert Homes",
      hashtags: ["desert", "oasis", "modern"]
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3",
      title: "Treehouse Living",
      author: "Unique Homes",
      hashtags: ["treehouse", "unique", "nature"]
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1572120360610-d971b9d7767c",
      title: "Lake House",
      author: "Waterfront Homes",
      hashtags: ["lake", "waterfront", "retreat"]
    }
  ],
  environment: [
    // Superb Environment (5)
    {
      imageUrl: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e",
      title: "Majestic Mountains",
      author: "Nature Photography",
      hashtags: ["mountains", "landscape", "majestic"]
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05",
      title: "Pristine Lake",
      author: "Landscape Artist",
      hashtags: ["lake", "pristine", "reflection"]
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e",
      title: "Ancient Forest",
      author: "Forest Explorer",
      hashtags: ["forest", "ancient", "nature"]
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1472396961693-142e6e269027",
      title: "Dramatic Coastline",
      author: "Coastal Photos",
      hashtags: ["coast", "dramatic", "ocean"]
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1469474968028-56623f02e42e",
      title: "Alpine Meadow",
      author: "Mountain Life",
      hashtags: ["alpine", "meadow", "flowers"]
    },
    // Modern Environment (15)
    {
      imageUrl: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429",
      title: "Urban Park",
      author: "City Nature",
      hashtags: ["urban", "park", "modern"]
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1473773508845-188df298d2d1",
      title: "Sustainable Garden",
      author: "Green Living",
      hashtags: ["garden", "sustainable", "modern"]
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e",
      title: "Green Architecture",
      author: "Eco Design",
      hashtags: ["architecture", "green", "modern"]
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05",
      title: "Rooftop Gardens",
      author: "Urban Farming",
      hashtags: ["rooftop", "garden", "city"]
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e",
      title: "Solar Park",
      author: "Clean Energy",
      hashtags: ["solar", "energy", "modern"]
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1472396961693-142e6e269027",
      title: "Eco Campus",
      author: "Green Education",
      hashtags: ["campus", "eco", "education"]
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1469474968028-56623f02e42e",
      title: "Smart Farm",
      author: "Modern Agriculture",
      hashtags: ["farm", "smart", "technology"]
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429",
      title: "Vertical Garden",
      author: "Urban Green",
      hashtags: ["vertical", "garden", "modern"]
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1473773508845-188df298d2d1",
      title: "Green Office",
      author: "Work Environment",
      hashtags: ["office", "green", "modern"]
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e",
      title: "Eco Housing",
      author: "Sustainable Living",
      hashtags: ["housing", "eco", "modern"]
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05",
      title: "Wind Farm",
      author: "Renewable Energy",
      hashtags: ["wind", "energy", "modern"]
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e",
      title: "Green Transport",
      author: "Eco Travel",
      hashtags: ["transport", "green", "modern"]
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1472396961693-142e6e269027",
      title: "Recycling Center",
      author: "Waste Management",
      hashtags: ["recycling", "waste", "modern"]
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1469474968028-56623f02e42e",
      title: "Green City",
      author: "Urban Planning",
      hashtags: ["city", "green", "planning"]
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429",
      title: "Eco Park",
      author: "Public Spaces",
      hashtags: ["park", "eco", "public"]
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
        <TabsList className="mb-8 flex-wrap">
          <TabsTrigger value="all">All Trending</TabsTrigger>
          {Object.keys(TRENDING_CATEGORIES).map((category) => (
            <TabsTrigger key={category} value={category}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </TabsTrigger>
          ))}
        </TabsList>

        <ScrollArea className="h-[80vh]">
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
        </ScrollArea>
      </Tabs>
    </div>
  );
};
```
