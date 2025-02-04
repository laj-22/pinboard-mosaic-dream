import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const Create = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleCreateBoard = () => {
    // Check if user has likes
    const hasLikes = false; // This would be replaced with actual likes check
    if (!hasLikes) {
      toast({
        title: "No Liked Items",
        description: "You don't have any liked items yet. Like some pins to create a board!",
        variant: "default",
      });
      return;
    }
    // Continue with board creation
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
        <h2 className="text-2xl font-bold">Choose Your Layout</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Button 
          onClick={() => navigate('/create/4')}
          className="h-40 bg-gray-100 hover:bg-gray-200 flex flex-col items-center justify-center"
        >
          <div className="grid grid-cols-2 gap-2 p-4">
            <div className="bg-gray-300 w-16 h-16"></div>
            <div className="bg-gray-300 w-16 h-16"></div>
            <div className="bg-gray-300 w-16 h-16"></div>
            <div className="bg-gray-300 w-16 h-16"></div>
          </div>
          <span className="mt-4">4 Images Layout</span>
        </Button>

        <Button
          onClick={() => navigate('/create/6')}
          className="h-40 bg-gray-100 hover:bg-gray-200 flex flex-col items-center justify-center"
        >
          <div className="grid grid-cols-3 gap-2 p-4">
            <div className="bg-gray-300 w-12 h-12"></div>
            <div className="bg-gray-300 w-12 h-12"></div>
            <div className="bg-gray-300 w-12 h-12"></div>
            <div className="bg-gray-300 w-12 h-12"></div>
            <div className="bg-gray-300 w-12 h-12"></div>
            <div className="bg-gray-300 w-12 h-12"></div>
          </div>
          <span className="mt-4">6 Images Layout</span>
        </Button>
      </div>
    </div>
  );
};

export default Create;