import { GitHubUser, GitHubRepo } from '../types/github';

const GITHUB_API_BASE = 'https://api.github.com';

export class GitHubService {
  private static async fetchWithErrorHandling<T>(url: string): Promise<T> {
    const response = await fetch(url);
    
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('User not found');
      }
      if (response.status === 403) {
        throw new Error('API rate limit exceeded');
      }
      throw new Error(`GitHub API error: ${response.status}`);
    }
    
    return response.json();
  }

  static async getUserProfile(username: string): Promise<GitHubUser> {
    return this.fetchWithErrorHandling<GitHubUser>(
      `${GITHUB_API_BASE}/users/${username}`
    );
  }

  static async getUserRepositories(username: string): Promise<GitHubRepo[]> {
    const repos = await this.fetchWithErrorHandling<GitHubRepo[]>(
      `${GITHUB_API_BASE}/users/${username}/repos?sort=updated&per_page=100`
    );
    
    return repos.filter(repo => !repo.name.includes('.github.io'));
  }

  static async getRepositoryLanguages(username: string, repoName: string): Promise<Record<string, number>> {
    return this.fetchWithErrorHandling<Record<string, number>>(
      `${GITHUB_API_BASE}/repos/${username}/${repoName}/languages`
    );
  }
}