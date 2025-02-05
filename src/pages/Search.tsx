import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Loader2 } from "lucide-react";
import { MasonryGrid } from "@/components/MasonryGrid";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";

const Search = () => {
  const { query } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState(query || "");

  const categories = {
    cars: ["classic", "vintage", "automotive"],
    houses: ["modern", "architecture", "home"],
    watches: ["luxury", "timepiece", "accessories"],
    environment: ["nature", "landscape", "outdoor"]
  };

  const matchingCategories = Object.keys(categories).filter(cat => 
    cat.toLowerCase().includes(searchQuery.toLowerCase()) ||
    categories[cat].some(tag => tag.includes(searchQuery.toLowerCase()))
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    navigate(`/search/${searchQuery}`);
    setTimeout(() => {
      setIsLoading(false);
      if (matchingCategories.length === 0) {
        toast({
          title: "No Results Found",
          description: "Try exploring our suggested categories below",
          variant: "default",
        });
      }
    }, 1000);
  };

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
        <form onSubmit={handleSearch} className="flex-1 max-w-xl">
          <Input
            type="search"
            placeholder="Search images..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full"
          />
        </form>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin" />
        </div>
      ) : matchingCategories.length === 0 ? (
        <div className="text-center py-8">
          <h3 className="text-xl mb-4">No results found for "{searchQuery}"</h3>
          <p className="text-gray-600 mb-4">Try exploring these categories instead:</p>
          <div className="flex flex-wrap gap-2 justify-center">
            {Object.keys(categories).map((category) => (
              <Button
                key={category}
                variant="outline"
                onClick={() => {
                  setSearchQuery(category);
                  navigate(`/search/${category}`);
                }}
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