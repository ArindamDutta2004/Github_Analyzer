export const languageColors: Record<string, string> = {
  JavaScript: '#f1e05a',
  TypeScript: '#2b7489',
  Python: '#3572A5',
  Java: '#b07219',
  'C++': '#f34b7d',
  C: '#555555',
  'C#': '#239120',
  PHP: '#4F5D95',
  Ruby: '#701516',
  Go: '#00ADD8',
  Rust: '#dea584',
  Swift: '#ffac45',
  Kotlin: '#F18E33',
  Dart: '#00B4AB',
  HTML: '#e34c26',
  CSS: '#563d7c',
  SCSS: '#c6538c',
  Vue: '#4FC08D',
  React: '#61DAFB',
  Angular: '#DD0031',
  Shell: '#89e051',
  PowerShell: '#012456',
  Dockerfile: '#384d54',
  JSON: '#292929',
  YAML: '#cb171e',
  Markdown: '#083fa1',
  default: '#8b5cf6'
};

export const getLanguageColor = (language: string): string => {
  return languageColors[language] || languageColors.default;
};