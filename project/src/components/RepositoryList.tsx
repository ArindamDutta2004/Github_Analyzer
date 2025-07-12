import React, { useState } from 'react';
import { GitHubRepo, LanguageData } from '../types/github';
import { RepositoryCard } from './RepositoryCard';
import { Search, Star, GitFork, Calendar } from 'lucide-react';

interface RepositoryListProps {
  repositories: GitHubRepo[];
  languages: LanguageData[];
}

export const RepositoryList: React.FC<RepositoryListProps> = ({ repositories, languages }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'updated' | 'stars' | 'forks' | 'name'>('updated');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('all');

  const filteredAndSortedRepos = repositories
    .filter(repo => {
      const matchesSearch = repo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           (repo.description?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false);
      const matchesLanguage = selectedLanguage === 'all' || repo.language === selectedLanguage;
      return matchesSearch && matchesLanguage;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'stars':
          return b.stargazers_count - a.stargazers_count;
        case 'forks':
          return b.forks_count - a.forks_count;
        case 'name':
          return a.name.localeCompare(b.name);
        case 'updated':
        default:
          return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
      }
    });

  const totalStars = repositories.reduce((sum, repo) => sum + repo.stargazers_count, 0);
  const totalForks = repositories.reduce((sum, repo) => sum + repo.forks_count, 0);

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Repositories</p>
              <p className="text-2xl font-bold text-white">{repositories.length}</p>
            </div>
            <div className="p-3 bg-blue-900 rounded-lg">
              <GitFork className="w-6 h-6 text-blue-400" />
            </div>
          </div>
        </div>
        
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Stars</p>
              <p className="text-2xl font-bold text-white">{totalStars}</p>
            </div>
            <div className="p-3 bg-yellow-900 rounded-lg">
              <Star className="w-6 h-6 text-yellow-400" />
            </div>
          </div>
        </div>
        
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Forks</p>
              <p className="text-2xl font-bold text-white">{totalForks}</p>
            </div>
            <div className="p-3 bg-green-900 rounded-lg">
              <GitFork className="w-6 h-6 text-green-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search repositories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="updated">Recently Updated</option>
            <option value="stars">Most Stars</option>
            <option value="forks">Most Forks</option>
            <option value="name">Name</option>
          </select>
          
          <select
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
            className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Languages</option>
            {languages.map((lang) => (
              <option key={lang.name} value={lang.name}>
                {lang.name} ({lang.count})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Repository Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredAndSortedRepos.map((repo) => (
          <RepositoryCard key={repo.id} repo={repo} />
        ))}
      </div>

      {filteredAndSortedRepos.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-400 text-lg">No repositories found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};