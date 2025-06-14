
import { useState, FormEvent } from 'react';
import { Search, MapPin, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface WeatherSearchProps {
  onSearch: (location: string) => void;
  isLoading: boolean;
}

const WeatherSearch = ({ onSearch, isLoading }: WeatherSearchProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onSearch(searchTerm);
      
      // Add to recent searches if not already there
      if (!recentSearches.includes(searchTerm)) {
        const newRecentSearches = [searchTerm, ...recentSearches].slice(0, 5);
        setRecentSearches(newRecentSearches);
        
        // Save to local storage
        localStorage.setItem('recentWeatherSearches', JSON.stringify(newRecentSearches));
      }
    }
  };
  
  const clearSearch = () => {
    setSearchTerm('');
    setShowSuggestions(false);
  };
  
  const handleSuggestionClick = (suggestion: string) => {
    setSearchTerm(suggestion);
    onSearch(suggestion);
    setShowSuggestions(false);
  };
  
  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem('recentWeatherSearches');
  };

  return (
    <div className="relative w-full max-w-xl mx-auto">
      <form onSubmit={handleSubmit} className="flex w-full shadow-lg">
        <div className="relative flex-grow">
          <Input
            type="text"
            placeholder="Enter a city, state, or country..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setShowSuggestions(true);
            }}
            className="rounded-r-none pr-10 bg-white border-farm-200 focus-visible:ring-farm-500 h-12 text-base"
            disabled={isLoading}
            onFocus={() => setShowSuggestions(true)}
          />
          {searchTerm && (
            <button
              type="button"
              onClick={clearSearch}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
        <Button 
          type="submit" 
          className="rounded-l-none bg-farm-600 hover:bg-farm-700 px-6 h-12" 
          disabled={isLoading || !searchTerm.trim()}
        >
          {isLoading ? (
            <span className="animate-spin inline-block h-4 w-4 border-2 border-white border-opacity-50 border-t-white rounded-full mr-2" />
          ) : (
            <Search className="h-4 w-4 mr-2" />
          )}
          Search
        </Button>
      </form>
      
      {/* Recent searches dropdown */}
      {showSuggestions && recentSearches.length > 0 && (
        <div 
          className="absolute z-10 mt-1 w-full bg-white rounded-md shadow-lg py-1 text-sm border border-gray-200"
          onMouseDown={(e) => e.preventDefault()} // Prevent input blur
        >
          <div className="flex justify-between items-center px-3 py-2 border-b border-gray-100">
            <span className="text-gray-600 font-medium">Recent Searches</span>
            <button 
              onClick={clearRecentSearches}
              className="text-xs text-farm-600 hover:text-farm-700"
            >
              Clear All
            </button>
          </div>
          {recentSearches.map((search, index) => (
            <button
              key={index}
              className="flex items-center w-full px-3 py-2 hover:bg-farm-50 text-left"
              onClick={() => handleSuggestionClick(search)}
            >
              <MapPin className="h-4 w-4 text-farm-500 mr-2" />
              <span>{search}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default WeatherSearch;
