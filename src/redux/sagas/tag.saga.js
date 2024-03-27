import axios from 'axios';
import { put, takeEvery, takeLatest } from 'redux-saga/effects';

// WATCHER SAGA
function* tagSaga() {
  yield takeEvery('FETCH_ALL_TAGS', fetchEm);
  yield takeEvery('FETCH_TAG', fetchIt);
}

// WORKER SAGA for GET ALL
function* fetchEm(action) {
  // console.log('Tags GET ALL worker SAGA');
  try {
    const tags = yield axios.get('/api/tag');
    console.log('get ALL TAGS SAGA result:', tags.data);
    yield put({ type: 'SET_TAGS', payload: tags.data });
  } catch (error) {
    console.log('ERROR GETTING TAGS:', error);
  }
}

// WORKER SAGA for GET ONE by Idea ID
function* fetchIt(action) {
  // console.log('Tags GET ALL worker SAGA');
  try {
    const tag = yield axios.get(`/api/tag/${action.payload}`);
    console.log('get ONE TAG SAGA result:', tag.data);
    yield put({ type: 'SET_TAG', payload: tag.data });
  } catch (error) {
    console.log('ERROR GETTING THE TAG:', error);
  }
}


export default tagSaga;