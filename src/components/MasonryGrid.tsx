import { PinCard } from './PinCard';

const DEMO_PINS = [
  // Main Categories
  {
    imageUrl: "https://images.unsplash.com/photo-1487887235947-a955ef187fcc",
    title: "Classic Cars",
    author: "Auto Enthusiast",
    hashtags: ["cars", "classic", "vintage"]
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1487958449943-2429e8be8625",
    title: "Modern Houses",
    author: "Architecture Today",
    hashtags: ["modern", "architecture", "house"]
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1434494878577-86c23bcb06b9",
    title: "Luxury Watches",
    author: "Time Keeper",
    hashtags: ["watches", "luxury", "timepiece"]
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1472396961693-142e6e269027",
    title: "Nature & Environment",
    author: "Nature Explorer",
    hashtags: ["nature", "environment", "outdoors"]
  },
  // Additional Random Categories
  {
    imageUrl: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    title: "Technology",
    author: "Tech Insider",
    hashtags: ["tech", "gadgets", "innovation"]
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1517022812141-23620dba5c23",
    title: "Wildlife",
    author: "Animal Planet",
    hashtags: ["animals", "wildlife", "nature"]
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9",
    title: "Cuisine",
    author: "Food Explorer",
    hashtags: ["food", "cooking", "cuisine"]
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1531297484001-80022131f5a1",
    title: "Digital Art",
    author: "Digital Artist",
    hashtags: ["art", "digital", "creative"]
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5",
    title: "Abstract",
    author: "Modern Artist",
    hashtags: ["abstract", "art", "modern"]
  }
];

export const MasonryGrid = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-4">
        {DEMO_PINS.map((pin, index) => (
          <PinCard
            key={index}
            imageUrl={pin.imageUrl}
            title={pin.title}
            author={pin.author}
            hashtags={pin.hashtags}
          />
        ))}
      </div>
    </div>
  );
};