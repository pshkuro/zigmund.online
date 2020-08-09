export interface Repository {
  name: string;
  description: string;
  url: string;
  statistics: {
    forks: number;
    watchers: number;
    stargazers: number;
  };
}
