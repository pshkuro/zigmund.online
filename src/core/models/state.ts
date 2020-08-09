import { Repository } from "./repository";
import { RequestStatus } from "../enums/request-status";

export interface State {
  repositories: Repository[] | null;
  status: RequestStatus;
  pageCount: number;
  org: string;
}
