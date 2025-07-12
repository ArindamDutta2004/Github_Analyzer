import React from 'react';
import { GitHubUser } from '../types/github';
import { MapPin, Calendar, Building, Link, Users, Star, BookOpen } from 'lucide-react';

interface UserProfileProps {
  user: GitHubUser;
}

export const UserProfile: React.FC<UserProfileProps> = ({ user }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long'
    });
  };

  return (
    <div className="bg-gray-800 rounded-xl p-6 shadow-xl border border-gray-700">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-shrink-0">
          <img
            src={user.avatar_url}
            alt={user.name}
            className="w-32 h-32 rounded-full border-4 border-blue-500 shadow-lg"
          />
        </div>
        
        <div className="flex-1">
          <div className="mb-4">
            <h1 className="text-3xl font-bold text-white mb-2">
              {user.name || user.login}
            </h1>
            <p className="text-xl text-gray-400">@{user.login}</p>
            {user.bio && (
              <p className="text-gray-300 mt-2 leading-relaxed">{user.bio}</p>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {user.company && (
              <div className="flex items-center text-gray-300">
                <Building className="w-4 h-4 mr-2" />
                <span>{user.company}</span>
              </div>
            )}
            {user.location && (
              <div className="flex items-center text-gray-300">
                <MapPin className="w-4 h-4 mr-2" />
                <span>{user.location}</span>
              </div>
            )}
            {user.blog && (
              <div className="flex items-center text-gray-300">
                <Link className="w-4 h-4 mr-2" />
                <a
                  href={user.blog.startsWith('http') ? user.blog : `https://${user.blog}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 transition-colors duration-200"
                >
                  {user.blog}
                </a>
              </div>
            )}
            <div className="flex items-center text-gray-300">
              <Calendar className="w-4 h-4 mr-2" />
              <span>Joined {formatDate(user.created_at)}</span>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-6">
            <div className="flex items-center text-gray-300">
              <Users className="w-4 h-4 mr-2" />
              <span className="text-white font-semibold">{user.followers}</span>
              <span className="ml-1">followers</span>
            </div>
            <div className="flex items-center text-gray-300">
              <Users className="w-4 h-4 mr-2" />
              <span className="text-white font-semibold">{user.following}</span>
              <span className="ml-1">following</span>
            </div>
            <div className="flex items-center text-gray-300">
              <BookOpen className="w-4 h-4 mr-2" />
              <span className="text-white font-semibold">{user.public_repos}</span>
              <span className="ml-1">repositories</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};