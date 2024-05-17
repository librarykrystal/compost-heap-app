import axios from 'axios';
import { put, takeEvery, takeLatest } from 'redux-saga/effects';

// WATCHER SAGA
function* tagSaga() {
  yield takeEvery('FETCH_ALL_TAGS', fetchEm);
  yield takeEvery('FETCH_TAG', fetchIt);
  yield takeEvery('FETCH_TAG_FOR_IDEA', fetchItbyIdeaId);
  yield takeEvery('ADD_TAG', addIt);
  yield takeEvery('UPDATE_TAG', updateIt);
  yield takeEvery('DELETE_TAG', deleteIt);
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

// WORKER SAGA for GET ONE by Tag ID
function* fetchIt(action) {
  try {
    const tag = yield axios.get(`/api/tag/${action.payload}`);
    console.log('get TAG by TAG-ID SAGA payload:', action.payload);
    console.log('get ONE TAG by TAG-ID SAGA result:', tag.data);
    yield put({ type: 'SET_TAG', payload: tag.data });
  } catch (error) {
    console.log('ERROR GETTING THE TAG:', error);
  }
}

// WORKER SAGA for GET ONE by Idea ID
function* fetchItbyIdeaId(action) {
  try {
    const tag = yield axios.get(`/api/tagbyidea/${action.payload}`);
    console.log('get ONE TAG by IDEA-ID SAGA payload:', action.payload);
    console.log('get ONE TAG by IDEA-ID SAGA result:', tag.data);
    yield put({ type: 'SET_TAG', payload: tag.data });
  } catch (error) {
    console.log('ERROR GETTING THE TAG:', error);
  }
}

// WORKER SAGA for ADD TAG
function* addIt(action) {
  console.log('POST action:', action.payload);
  try {
    const newTag = yield axios.post('/api/tag', action.payload);
    console.log('POST SAGA SUCCESS:', newTag.data.id);
    yield fetchIt({type: 'FETCH_TAG', payload: newTag.data.id });
  } catch (error) {
  console.log('ERROR ADDING TAG:', error);
}
}

// WORKER SAGA for PUT/UPDATE TAG
function* updateIt(action) {
  console.log('updateIt SAGA PUT TAG payload:', action.payload);
  try {
    yield axios.put(`/api/tag`, action.payload);
    yield fetchIt({type: 'FETCH_TAG', payload: `${action.payload.id}`});
  } catch (error) {
    console.log('ERROR EDITING TAG:', error);
  }
}

// WORKER SAGA for DELETE TAG
function* deleteIt(action) {
  try {
      const tagToDelete = yield axios.delete(`/api/tag/${action.payload}`);
      console.log('DELETE TAG SAGA payload:', action.payload);
  } catch (error) {
    console.log('ERROR DELETING TAG:', error);
  }
}

export default tagSaga;