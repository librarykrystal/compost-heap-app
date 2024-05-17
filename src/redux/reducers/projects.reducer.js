const projectsReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_PROJECTS':
      return action.payload;
      case 'SET_PROJECT':
      return action.payload;
    default:
      return state;
  }
};


export default projectsReducer;