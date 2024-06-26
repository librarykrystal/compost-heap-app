import { all } from 'redux-saga/effects';
import loginSaga from './login.saga';
import registrationSaga from './registration.saga';
import userSaga from './user.saga';
import ideaSaga from './idea.saga';
import projectSaga from './project.saga';
import tagSaga from './tag.saga';


export default function* rootSaga() {
  yield all([
    loginSaga(),
    registrationSaga(),
    userSaga(),
    ideaSaga(),
    projectSaga(),
    tagSaga(),
  ]);
}
