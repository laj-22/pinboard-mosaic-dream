import { useParams } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Search = () => {
  const { query } = useParams();

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

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-8">Search Results for: {query}</h2>
      
      <Tabs defaultValue="all">
        <TabsList className="mb-8">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="cars">Classic Cars</TabsTrigger>
          <TabsTrigger value="houses">Houses</TabsTrigger>
          <TabsTrigger value="watches">Watches</TabsTrigger>
          <TabsTrigger value="environment">Environment</TabsTrigger>
        </TabsList>

        {/* Add content for each tab */}
      </Tabs>
    </div>
  );
};

export default Search;