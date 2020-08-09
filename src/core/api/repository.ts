import { createApi } from "./api";
import parseLinkHeader from "parse-link-header";
import { RepositoryResponse } from "../models/repository-response";

const api = createApi();

export const getRepositories = ({
  org,
  perPage = 12,
  page = 1,
}: {
  org: string;
  perPage?: number;
  page?: number;
}) =>
  api
    .get<RepositoryResponse[]>(`/orgs/${org}/repos`, {
      params: {
        per_page: perPage,
        page,
      },
    })
    .then((response) => {
      const link = response.headers.link as string;
      const pageCount = parseLinkHeader(link)?.last?.page;
      const repositories = response.data;

      return { repositories, pageCount };
    });
