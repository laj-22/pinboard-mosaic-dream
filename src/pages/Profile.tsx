import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MasonryGrid } from "@/components/MasonryGrid";

const Profile = () => {
  return (
    <div className="container mx-auto px-4 py-8">
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
            {/* Add your board components here */}
            <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
              <span className="text-gray-500">Create Board</span>
            </div>
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