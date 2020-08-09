import { all, takeLatest, call, put } from "redux-saga/effects";
import { getRepositories } from "../../core/api/repository";
import {
  GetRepositoriesAction,
  SET_REQUEST_STATUS,
  SET_REPOSITORIES,
} from "../../core/models/actions";
import { parseRepository } from "../../core/mappers/repository.mapper";
import { RequestStatus } from "../../core/enums/request-status";

function* _getRepositories(action: GetRepositoriesAction) {
  try {
    yield put({
      type: SET_REQUEST_STATUS,
      payload: { status: RequestStatus.Pending },
    });

    const org = action.payload.org;
    const page = action.payload.page;
    const data = yield call(getRepositories, { org, page });
    const repositories = data.repositories.map(parseRepository);
    const pageCount = Number(data.pageCount);

    yield put({
      type: SET_REPOSITORIES,
      payload: {
        repositories,
        pageCount,
      },
    });

    yield put({
      type: SET_REQUEST_STATUS,
      payload: { status: RequestStatus.Success },
    });
  } catch (error) {
    yield put({
      type: SET_REQUEST_STATUS,
      payload: { status: RequestStatus.Error },
    });
  }
}

function* actionWatcher() {
  yield takeLatest(`GET_REPOSITORIES`, _getRepositories);
}

export default function* rootSaga() {
  yield all([actionWatcher()]);
}
