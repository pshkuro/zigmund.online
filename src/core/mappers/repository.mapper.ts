import { RepositoryResponse } from "../models/repository-response";
import { Repository } from "../models/repository";

export const parseRepository = (repository: RepositoryResponse): Repository => {
  const {
    name,
    description,
    html_url: url,
    forks_count: forks,
    stargazers_count: stargazers,
    watchers_count: watchers,
  } = repository;

  return {
    name,
    description,
    url,
    statistics: {
      forks,
      stargazers,
      watchers,
    },
  };
};
