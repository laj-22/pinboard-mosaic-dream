import { Search } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';

export const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <h1 className="text-[#ea384c] font-bold text-2xl">PinMosaic</h1>
            <Button variant="ghost" onClick={() => navigate('/')}>Home</Button>
            <Button variant="ghost" onClick={() => navigate('/create')}>Create</Button>
          </div>
          
          <div className="flex-1 max-w-2xl px-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search"
                className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-[#ea384c]"
                onChange={(e) => navigate(`/search/${e.target.value}`)}
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => navigate('/profile')} className="rounded-full">
              <img
                src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=50&h=50&fit=crop"
                alt="Profile"
                className="w-8 h-8 rounded-full"
              />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};