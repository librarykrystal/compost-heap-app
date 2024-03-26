import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';

// WATCHER SAGA
function* heapSaga() {
  yield takeEvery('FETCH_USER_HEAP', fetchEm);
  yield takeEvery('FETCH_IDEA', fetchIt);
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

// WORKER SAGA for GET SPECIFIC IDEA BY ID
function* fetchIt(action) {
  console.log('fetchIt action:', action);
  try {
      const item = yield axios.get(`/api/heap/${action.payload}`);
      console.log('GET IDEA result:', item.data);
      yield put({ type: 'SET_IDEA', payload: item.data[0] });
  } catch (error) {
    console.log('ERROR GETTING IDEA:', error);
  }
}


export default heapSaga;