import axios from 'axios';
import { put, takeEvery, takeLatest } from 'redux-saga/effects';

// WATCHER SAGA
function* projectSaga() {
  yield takeEvery('FETCH_ALL_PROJECTS', fetchEm);
  yield takeEvery('FETCH_PROJECT', fetchIt);
  yield takeEvery('ADD_PROJECT', addIt);
  yield takeEvery('UPDATE_PROJECT', updateIt);
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

// WORKER SAGA for GET ONE by ID
function* fetchIt(action) {
  try {
    const project = yield axios.get(`/api/project/${action.payload}`);
    console.log('get PROJECT by ID SAGA payload:', action.payload);
    console.log('get PROJECT by ID SAGA result:', project.data);
    yield put({ type: 'SET_PROJECT', payload: project.data });
  } catch (error) {
    console.log('ERROR GETTING THE PROJECT:', error);
  }
}

// WORKER SAGA for ADD PROJECT
function* addIt(action) {
  console.log('POST action:', action.payload);
  try {
    const newProject = yield axios.post('/api/project', action.payload);
    console.log('POST SAGA SUCCESS:', newProject.data.id);
    // yield fetchIt({type: 'FETCH_PROJECT', payload: newTag.data.id });
  } catch (error) {
  console.log('ERROR ADDING PROJECT:', error);
}
}

// WORKER SAGA for PUT/UPDATE PROJECT
function* updateIt(action) {
  console.log('updateIt SAGA PUT PROJECT payload:', action.payload);
  try {
    yield axios.put(`/api/project`, action.payload);
    yield fetchIt({type: 'FETCH_PROJECT', payload: `${action.payload.id}`});
  } catch (error) {
    console.log('ERROR EDITING PROJECT:', error);
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