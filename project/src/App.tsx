import React, { useState } from 'react';
import { GitHubUser, GitHubRepo, LanguageData } from './types/github';
import { GitHubService } from './services/github';
import { SearchInput } from './components/SearchInput';
import { UserProfile } from './components/UserProfile';
import { RepositoryList } from './components/RepositoryList';
import { LanguageChart } from './components/LanguageChart';
import { getLanguageColor } from './utils/colors';
import { Github, AlertCircle } from 'lucide-react';

function App() {
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [repositories, setRepositories] = useState<GitHubRepo[]>([]);
  const [languages, setLanguages] = useState<LanguageData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const processLanguageData = (repos: GitHubRepo[]): LanguageData[] => {
    const languageCount = repos.reduce((acc, repo) => {
      if (repo.language) {
        acc[repo.language] = (acc[repo.language] || 0) + 1;
      }
      return acc;
    }, {} as Record<string, number>);

    const total = Object.values(languageCount).reduce((sum, count) => sum + count, 0);
    
    return Object.entries(languageCount)
      .map(([name, count]) => ({
        name,
        count,
        percentage: (count / total) * 100,
        color: getLanguageColor(name)
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10); // Top 10 languages
  };

  const handleSearch = async (username: string) => {
    setLoading(true);
    setError(null);
    setUser(null);
    setRepositories([]);
    setLanguages([]);

    try {
      const [userProfile, repos] = await Promise.all([
        GitHubService.getUserProfile(username),
        GitHubService.getUserRepositories(username)
      ]);

      setUser(userProfile);
      setRepositories(repos);
      setLanguages(processLanguageData(repos));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-center space-x-3">
            <Github className="w-8 h-8 text-blue-400" />
            <h1 className="text-3xl font-bold text-white">GitView</h1>
            <span className="text-gray-400">GitHub Profile Analyzer</span>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Section */}
        <div className="mb-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-semibold text-white mb-2">
              Discover GitHub Profiles
            </h2>
            <p className="text-gray-400">
              Enter a GitHub username to analyze their profile, repositories, and coding activity
            </p>
          </div>
          <SearchInput onSearch={handleSearch} loading={loading} />
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-8 bg-red-900 border border-red-700 rounded-lg p-4">
            <div className="flex items-center">
              <AlertCircle className="w-5 h-5 text-red-400 mr-3" />
              <p className="text-red-200">{error}</p>
            </div>
          </div>
        )}

        {/* Results */}
        {user && (
          <div className="space-y-8">
            {/* User Profile */}
            <UserProfile user={user} />

            {/* Charts and Stats */}
            {languages.length > 0 && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <LanguageChart languages={languages} />
                </div>
                <div className="bg-gray-800 rounded-xl p-6 shadow-xl border border-gray-700">
                  <h3 className="text-xl font-bold text-white mb-4">Top Languages</h3>
                  <div className="space-y-3">
                    {languages.slice(0, 5).map((lang) => (
                      <div key={lang.name} className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div 
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: lang.color }}
                          />
                          <span className="text-white text-sm">{lang.name}</span>
                        </div>
                        <div className="text-gray-400 text-sm">
                          {lang.count} repos ({lang.percentage.toFixed(1)}%)
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Repository List */}
            {repositories.length > 0 && (
              <RepositoryList repositories={repositories} languages={languages} />
            )}
          </div>
        )}

        {/* Default State */}
        {!user && !loading && !error && (
          <div className="text-center py-16">
            <Github className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-400 mb-2">
              Ready to explore GitHub profiles
            </h3>
            <p className="text-gray-500">
              Search for any GitHub username to get started with detailed analytics
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;