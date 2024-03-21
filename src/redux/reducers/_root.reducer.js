import { combineReducers } from 'redux';
import errors from './errors.reducer';
import user from './user.reducer';
import heap from './heap.reducer';
import tag from './tag.reducer';


const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  user, // will have an id and username if someone is logged in
  heap,
  tag,
});

export default rootReducer;
