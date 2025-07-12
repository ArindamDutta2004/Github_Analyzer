import React from 'react';
import { GitHubRepo } from '../types/github';
import { Star, GitFork, Eye, AlertCircle, ExternalLink } from 'lucide-react';
import { getLanguageColor } from '../utils/colors';

interface RepositoryCardProps {
  repo: GitHubRepo;
}

export const RepositoryCard: React.FC<RepositoryCardProps> = ({ repo }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-gray-600 transition-all duration-200 hover:shadow-lg">
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-blue-400 hover:text-blue-300 transition-colors duration-200">
            <a 
              href={repo.html_url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              {repo.name}
              <ExternalLink className="w-4 h-4" />
            </a>
          </h3>
          {repo.description && (
            <p className="text-gray-300 text-sm mt-1 leading-relaxed">
              {repo.description}
            </p>
          )}
        </div>
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4 text-sm text-gray-400">
          {repo.language && (
            <div className="flex items-center space-x-1">
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: getLanguageColor(repo.language) }}
              />
              <span>{repo.language}</span>
            </div>
          )}
          
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4" />
            <span>{repo.stargazers_count}</span>
          </div>
          
          <div className="flex items-center space-x-1">
            <GitFork className="w-4 h-4" />
            <span>{repo.forks_count}</span>
          </div>
          
          {repo.open_issues_count > 0 && (
            <div className="flex items-center space-x-1">
              <AlertCircle className="w-4 h-4" />
              <span>{repo.open_issues_count}</span>
            </div>
          )}
        </div>
        
        <div className="text-xs text-gray-500">
          Updated {formatDate(repo.updated_at)}
        </div>
      </div>
      
      {repo.topics && repo.topics.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1">
          {repo.topics.map((topic) => (
            <span
              key={topic}
              className="px-2 py-1 bg-blue-900 text-blue-200 text-xs rounded-full"
            >
              {topic}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};