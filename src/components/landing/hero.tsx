import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <div className="text-center mb-8">
      <div className="inline-flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 rounded-full px-3 py-1 mb-4">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
        <span>142 libraries · always up to date</span>
      </div>
      <h1 className="text-4xl sm:text-5xl font-medium tracking-tight text-gray-900 dark:text-white mb-3">
        Ask any AI about any
        <br />
        <span className="text-blue-700 dark:text-blue-400">
          JavaScript library
        </span>
      </h1>
      <p className="text-sm text-gray-600 dark:text-gray-400 max-w-lg mx-auto mb-6">
        Find the library, hit Ask, and get redirected to your preferred LLM with
        the full docs as context — no copy-pasting, no context overflow.
      </p>
      <div className="relative max-w-md mx-auto">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          id="search-input"
          type="text"
          placeholder="Search libraries… React, Zod, TanStack…"
          className="pl-9 pr-16 h-11 bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <kbd className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 rounded px-1.5 py-0.5 font-mono">
          ⌘K
        </kbd>
      </div>
    </div>
  );
};

export default HeroSection;
