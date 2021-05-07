// ./src/sagas/index.js

import { all, call, put, takeEvery } from 'redux-saga/effects';
import { LOAD_NEWS_LIST, RENDER_NEWS_LIST } from '../actions';

export function* fetNewsList() {
  const endpoint = 'https://newsapi.org/v2/everything?q=Apple&from=2021-05-07&sortBy=popularity&apiKey=bb91684cfdac41df878b44b0cee08929';
  const response = yield call(fetch, endpoint);
  const data = yield response.json();
  yield put({ type: RENDER_NEWS_LIST, newsList: data.articles });
}

export function* loadNewsList() {
  yield takeEvery(LOAD_NEWS_LIST, fetNewsList);
}

export default function* rootSaga() {
  yield all([loadNewsList()]);
}