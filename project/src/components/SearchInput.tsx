import React, { useState } from 'react';
import { Search } from 'lucide-react';

interface SearchInputProps {
  onSearch: (username: string) => void;
  loading: boolean;
}

export const SearchInput: React.FC<SearchInputProps> = ({ onSearch, loading }) => {
  const [username, setUsername] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      onSearch(username.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter GitHub username"
          className="block w-full pl-10 pr-3 py-3 border border-gray-700 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          disabled={loading}
        />
        <button
          type="submit"
          disabled={loading || !username.trim()}
          className="absolute inset-y-0 right-0 flex items-center pr-3 text-blue-400 hover:text-blue-300 disabled:text-gray-500 disabled:cursor-not-allowed transition-colors duration-200"
        >
          {loading ? (
            <div className="animate-spin rounded-full h-5 w-5 border-2 border-blue-400 border-t-transparent" />
          ) : (
            <Search className="h-5 w-5" />
          )}
        </button>
      </div>
    </form>
  );
};