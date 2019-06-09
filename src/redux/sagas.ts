import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import { fetchToken } from './../api'

// worker Saga : 将在 TOKEN_FETCH_REQUESTED action 被 dispatch 时调用
interface Action {
  payload: any
}

function* getUserInfo(action:Action) {
  try {
    const info = yield call(fetchToken, action.payload);
    yield put({ type: "TOKEN_FETCH_SUCCEEDED", info: info });  // 相当于dispatch,但是不用引入dispatch函数
  } catch (e) {
    yield put({ type: "TOKEN_FETCH_FAILED", message: e.message });
  }
}

function* mySaga() {
  yield takeEvery("TOKEN_FETCH_REQUESTED", getUserInfo);
}

export default mySaga;