import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';

// WATCHER SAGA
function* heapSaga() {
  yield takeEvery('FETCH_USER_HEAP', fetchEm);
}

// WORKER SAGA for GET ALL
function* fetchEm(action) {
  console.log('Heap GET ALL worker SAGA');
  try {
    const heap = yield axios.get('/api/heap');
    console.log('get all result:', heap.data);
    yield put({ type: 'SET_HEAP', payload: heap.data });
  } catch (error) {
    console.log('ERROR GETTING HEAP:', error);
  }
}


export default heapSaga;