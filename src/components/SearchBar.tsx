import { useState } from "react";
import { Search, MapPin } from "lucide-react";

interface SearchBarProps {
  onSearch: (city: string) => void;
  onLocate: () => void;
  isLoading: boolean;
}

const SearchBar = ({ onSearch, onLocate, isLoading }: SearchBarProps) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 w-full max-w-md mx-auto">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search any city..."
          disabled={isLoading}
          className="w-full pl-10 pr-4 py-3 rounded-lg glass text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-sm"
        />
      </div>
      <button
        type="button"
        onClick={onLocate}
        disabled={isLoading}
        title="Use my location"
        className="p-3 rounded-lg glass text-muted-foreground hover:text-primary transition-colors disabled:opacity-50"
      >
        <MapPin className="w-4 h-4" />
      </button>
    </form>
  );
};

export default SearchBar;
