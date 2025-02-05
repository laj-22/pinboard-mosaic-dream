import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Upload, Image, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useDropzone } from "react-dropzone";

const Create = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [boardName, setBoardName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedLayout, setSelectedLayout] = useState<"4" | "6" | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
        toast({
          title: "Image Added",
          description: "Your image has been successfully uploaded!",
        });
      };
      reader.readAsDataURL(file);
    }
  }, [toast]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif']
    },
    multiple: false
  });

  const handleCreateBoard = () => {
    if (!boardName.trim()) {
      toast({
        title: "Board Name Required",
        description: "Please enter a name for your board",
        variant: "default",
      });
      return;
    }

    if (!previewImage) {
      toast({
        title: "Image Required",
        description: "Please upload at least one image for your board",
        variant: "default",
      });
      return;
    }

    setIsLoading(true);
    // Simulate board creation
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Board Created",
        description: "Your new board has been created successfully!",
      });
      navigate("/");
    }, 1500);
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
        <h2 className="text-2xl font-bold">Create New Board</h2>
      </div>

      <div className="max-w-xl mx-auto space-y-8">
        <div>
          <Label htmlFor="boardName">Board Name</Label>
          <Input
            id="boardName"
            placeholder="Enter board name..."
            value={boardName}
            onChange={(e) => setBoardName(e.target.value)}
            className="mt-2"
          />
        </div>

        <div>
          <Label>Upload Image</Label>
          <div
            {...getRootProps()}
            className={`mt-2 border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
              ${isDragActive ? 'border-primary bg-primary/5' : 'border-gray-300 hover:border-primary'}`}
          >
            <input {...getInputProps()} />
            <Upload className="mx-auto h-12 w-12 text-gray-400" />
            <p className="mt-2 text-sm text-gray-600">
              {isDragActive ? 'Drop the image here' : 'Drag & drop an image here, or click to select'}
            </p>
          </div>

          {previewImage && (
            <div className="mt-4">
              <Label>Preview</Label>
              <div className="mt-2 relative rounded-lg overflow-hidden">
                <img
                  src={previewImage}
                  alt="Preview"
                  className="w-full h-48 object-cover"
                />
                <Button
                  variant="destructive"
                  size="sm"
                  className="absolute top-2 right-2"
                  onClick={() => setPreviewImage(null)}
                >
                  Remove
                </Button>
              </div>
            </div>
          )}
        </div>

        <div>
          <Label>Choose Layout</Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
            <Button 
              onClick={() => setSelectedLayout("4")}
              className={`h-40 ${
                selectedLayout === "4" ? "border-2 border-primary" : "bg-gray-100"
              } hover:bg-gray-200 flex flex-col items-center justify-center`}
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
              onClick={() => setSelectedLayout("6")}
              className={`h-40 ${
                selectedLayout === "6" ? "border-2 border-primary" : "bg-gray-100"
              } hover:bg-gray-200 flex flex-col items-center justify-center`}
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

        <div className="flex justify-end">
          <Button
            onClick={handleCreateBoard}
            disabled={!boardName.trim() || !selectedLayout || !previewImage || isLoading}
            className="w-full md:w-auto"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Creating Board...
              </>
            ) : (
              <>
                <Image className="w-4 h-4 mr-2" />
                Create Board
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Create;