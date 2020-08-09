import { Repository } from "./repository";
import { RequestStatus } from "../enums/request-status";

export const GET_REPOSITORIES = `GET_REPOSITORIES`;
export const SET_REPOSITORIES = `SET_REPOSITORIES`;
export const SET_REQUEST_STATUS = `SET_REQUEST_STATUS`;

export interface SetRepositoriesAction {
  type: typeof SET_REPOSITORIES;
  payload: {
    repositories: Repository[];
    pageCount: number;
  };
}

export interface SetRequestAction {
  type: typeof SET_REQUEST_STATUS;
  payload: {
    status: RequestStatus;
  };
}

export interface GetRepositoriesAction {
  type: typeof GET_REPOSITORIES;
  payload: {
    org: string;
    page: number;
  };
}

export type RepositoriesActionTypes =
  | SetRepositoriesAction
  | SetRequestAction
  | GetRepositoriesAction;
