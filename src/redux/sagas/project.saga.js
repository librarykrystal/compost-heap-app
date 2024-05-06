import axios from 'axios';
import { put, takeEvery, takeLatest } from 'redux-saga/effects';

// WATCHER SAGA
function* projectSaga() {
  yield takeEvery('FETCH_ALL_PROJECTS', fetchEm);
  yield takeEvery('DELETE_PROJECT', deleteIt);
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

// WORKER SAGA for DELETE PROJECT
function* deleteIt(action) {
  try {
      const projectToDelete = yield axios.delete(`/api/project/${action.payload}`);
      console.log('DELETE PROJECT SAGA payload:', action.payload);
  } catch (error) {
    console.log('ERROR DELETING PROJECT:', error);
  }
}


export default projectSaga;