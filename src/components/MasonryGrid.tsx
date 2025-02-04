import { PinCard } from './PinCard';

const DEMO_PINS = [
  {
    imageUrl: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&h=800&fit=crop",
    title: "Modern Workspace",
    author: "Tech Enthusiast"
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=1000&fit=crop",
    title: "Remote Work Setup",
    author: "Digital Nomad"
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=600&fit=crop",
    title: "Productivity Station",
    author: "Workspace Designer"
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=900&fit=crop",
    title: "Code Life",
    author: "Developer"
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=800&h=1200&fit=crop",
    title: "Modern Living",
    author: "Interior Designer"
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
          />
        ))}
      </div>
    </div>
  );
};