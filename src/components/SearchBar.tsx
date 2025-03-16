
import { Search } from "lucide-react";
import { useState } from "react";

export function SearchBar() {
  const [isFocused, setIsFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div
      className={`relative flex items-center transition-all duration-300 ${
        isFocused 
          ? "w-full md:w-96 bg-white dark:bg-black shadow-md" 
          : "w-full md:w-64 bg-secondary dark:bg-secondary/50"
      } rounded-full px-3 py-2`}
    >
      <Search className="w-4 h-4 text-muted-foreground" />
      <input
        type="text"
        placeholder="Search threats, CVEs, vendors..."
        className="w-full bg-transparent border-none focus:outline-none focus:ring-0 placeholder:text-muted-foreground text-sm ml-2"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
    </div>
  );
}
