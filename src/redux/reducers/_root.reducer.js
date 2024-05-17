import { combineReducers } from 'redux';
import errors from './errors.reducer';
import user from './user.reducer';
import heap from './heap.reducer';
import idea from './idea.reducer';
import project from './project.reducer';
import projects from './projects.reducer';
import tag from './tag.reducer';
import tags from './tags.reducer';


const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  user, // will have an id and username if someone is logged in
  heap,
  idea,
  project,
  projects,
  tag,
  tags,
});

export default rootReducer;
