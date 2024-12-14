import React, { useState } from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  onSubmit: (query: string) => void;
  isLoading: boolean;
}

export function SearchBar({ onSubmit, isLoading }: SearchBarProps) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSubmit(query.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
        <div className="flex flex-1 items-center rounded-lg border border-gray-300 bg-white shadow-sm">
          <span className="px-3 sm:px-4 py-3 text-gray-500 bg-gray-50 border-r border-gray-300 rounded-l-lg text-sm sm:text-base">
            How to
          </span>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="center a div in CSS..."
            className="flex-1 px-3 sm:px-4 py-3 text-sm sm:text-base focus:outline-none w-full"
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="px-4 sm:px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 
                   transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <Search className="w-5 h-5" />
          )}
          <span>Search</span>
        </button>
      </div>
    </form>
  );
}