import { useParams, useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { MasonryGrid } from "@/components/MasonryGrid";

const Search = () => {
  const { query } = useParams();
  const navigate = useNavigate();

  const categories = {
    cars: [
      // Replace these image URLs with your classic car images
      "https://images.unsplash.com/photo-1487887235947-a955ef187fcc",
      // Add more car images
    ],
    houses: [
      // Replace with house images
      "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
      "https://images.unsplash.com/photo-1527576539890-dfa815648363",
    ],
    watches: [
      // Replace with watch images
      "https://images.unsplash.com/photo-1434494878577-86c23bcb06b9",
    ],
    environment: {
      beach: ["https://images.unsplash.com/photo-1472396961693-142e6e269027"],
      forest: ["https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9"],
      city: ["https://images.unsplash.com/photo-1487958449943-2429e8be8625"],
    }
  };

  const allCategories = ['cars', 'houses', 'watches', 'beach', 'forest', 'city'];
  const matchingCategories = allCategories.filter(cat => 
    cat.toLowerCase().includes(query?.toLowerCase() || '')
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-4 mb-8">
        <Button 
          variant="ghost" 
          onClick={() => navigate(-1)}
          className="p-2 hover:bg-gray-100 rounded-full"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h2 className="text-2xl font-bold">Search Results for: {query}</h2>
      </div>

      {matchingCategories.length === 0 ? (
        <div className="text-center py-8">
          <h3 className="text-xl mb-4">No results found for "{query}"</h3>
          <p className="text-gray-600 mb-4">Try exploring these categories instead:</p>
          <div className="flex flex-wrap gap-2 justify-center">
            {allCategories.map((category) => (
              <Button
                key={category}
                variant="outline"
                onClick={() => navigate(`/search/${category}`)}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      ) : (
        <Tabs defaultValue="all">
          <TabsList className="mb-8">
            <TabsTrigger value="all">All</TabsTrigger>
            {matchingCategories.map((category) => (
              <TabsTrigger key={category} value={category}>
                {category}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="all">
            <MasonryGrid />
          </TabsContent>
          
          {matchingCategories.map((category) => (
            <TabsContent key={category} value={category}>
              <MasonryGrid />
            </TabsContent>
          ))}
        </Tabs>
      )}
    </div>
  );
};

export default Search;