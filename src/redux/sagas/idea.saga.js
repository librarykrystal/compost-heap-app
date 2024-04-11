import axios from 'axios';
import { put, takeEvery, takeLatest } from 'redux-saga/effects';

// WATCHER SAGA
function* ideaSaga() {
  yield takeLatest('FETCH_USER_HEAP', fetchEm);
  yield takeLatest('FETCH_IDEA', fetchIt);
  yield takeEvery('ADD_IDEA', addIt);
}

// WORKER SAGA for GET ALL
function* fetchEm(action) {
  console.log('Heap GET ALL worker SAGA');
  try {
    const heap = yield axios.get('/api/idea');
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
      const item = yield axios.get(`/api/idea/${action.payload}`);
      console.log('GET IDEA result:', item.data);
      yield put({ type: 'SET_IDEA', payload: item.data[0] });
  } catch (error) {
    console.log('ERROR GETTING IDEA:', error);
  }
}

// WORKER SAGA for ADD IDEA
function* addIt(action) {
  console.log('POST action:', action.payload);
  try {
    const newIdea = yield axios.post('/api/idea', action.payload);
    console.log('POST SAGA SUCCESS:', newIdea.data.id);
    yield fetchIt({type: 'FETCH_IDEA', payload: newIdea.data.id });
  } catch (error) {
  console.log('ERROR ADDING IDEA:', error);
}
}


export default ideaSaga;