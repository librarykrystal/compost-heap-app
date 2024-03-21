import { all } from 'redux-saga/effects';
import loginSaga from './login.saga';
import registrationSaga from './registration.saga';
import userSaga from './user.saga';
import heapSaga from './heap.saga';
import tagSaga from './tag.saga';


export default function* rootSaga() {
  yield all([
    loginSaga(),
    registrationSaga(),
    userSaga(),
    heapSaga(),
    tagSaga(),
  ]);
}
