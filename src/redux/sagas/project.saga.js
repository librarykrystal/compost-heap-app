import axios from 'axios';
import { put, takeEvery, takeLatest } from 'redux-saga/effects';

// WATCHER SAGA
function* projectSaga() {
  yield takeEvery('FETCH_ALL_PROJECTS', fetchEm);
}

// WORKER SAGA for GET ALL
function* fetchEm(action) {
  console.log('Projects GET ALL worker SAGA');
  try {
    const projects = yield axios.get('/api/project');
    console.log('get ALL PROJECTS SAGA result:', projects.data);
    yield put({ type: 'SET_PROJECTS', payload: projects.data });
  } catch (error) {
    console.log('ERROR GETTING PROJECTS:', error);
  }
}


export default projectSaga;