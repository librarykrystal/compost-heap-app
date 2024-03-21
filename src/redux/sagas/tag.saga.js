import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';

// WATCHER SAGA
function* tagSaga() {
  yield takeEvery('FETCH_ALL_TAGS', fetchEm);
}

// WORKER SAGA for GET ALL
function* fetchEm(action) {
  console.log('Tags GET ALL worker SAGA');
  try {
    const tags = yield axios.get('/api/tag');
    console.log('get all result:', tags.data);
    yield put({ type: 'SET_TAGS', payload: tags.data });
  } catch (error) {
    console.log('ERROR GETTING TAGS:', error);
  }
}


export default tagSaga;