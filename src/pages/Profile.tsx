import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MasonryGrid } from "@/components/MasonryGrid";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const Profile = () => {
  const navigate = useNavigate();

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
      </div>

      <div className="flex items-center gap-6 mb-8">
        <img
          src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=100&h=100&fit=crop"
          alt="Profile"
          className="w-24 h-24 rounded-full"
        />
        <div>
          <h2 className="text-2xl font-bold">Username</h2>
          <p className="text-gray-600">@username</p>
        </div>
      </div>

      <Tabs defaultValue="boards">
        <TabsList className="mb-8">
          <TabsTrigger value="boards">Boards</TabsTrigger>
          <TabsTrigger value="likes">Likes</TabsTrigger>
          <TabsTrigger value="saved">Saved</TabsTrigger>
        </TabsList>
        
        <TabsContent value="boards">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <Button
              onClick={() => navigate('/create')}
              className="aspect-square bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center justify-center"
            >
              <span className="text-gray-500">Create Board</span>
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="likes">
          <MasonryGrid />
        </TabsContent>
        
        <TabsContent value="saved">
          <MasonryGrid />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Profile;