import { Repository } from "../core/models/repository";
import {
  RepositoriesActionTypes,
  GET_REPOSITORIES,
  SET_REPOSITORIES,
  SET_REQUEST_STATUS,
} from "../core/models/actions";

const initialState = {
  repositories: null,
  status: null,
  pageCount: 0,
  org: ``,
};

const ActionCreator = {
  getRepositories: (org: string, page = 1) => {
    return {
      type: GET_REPOSITORIES,
      payload: {
        org,
        page,
      },
    };
  },

  setRepositories: (repositories: Repository[]) => {
    return {
      type: SET_REPOSITORIES,
      payload: {
        repositories,
      },
    };
  },

  setRequestStatus: (status: string | null) => {
    return {
      type: SET_REQUEST_STATUS,
      payload: {
        status,
      },
    };
  },
};

const reducer = (state = initialState, action: RepositoriesActionTypes) => {
  switch (action.type) {
    case GET_REPOSITORIES:
      return Object.assign({}, state, {
        org: action.payload.org,
      });

    case SET_REPOSITORIES:
      return Object.assign({}, state, {
        repositories: action.payload.repositories,
        pageCount: action.payload.pageCount || state.pageCount,
      });

    case SET_REQUEST_STATUS:
      return Object.assign({}, state, {
        status: action.payload.status,
      });

    default:
      return state;
  }
};

export { ActionCreator };
export default reducer;
