const tagReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_TAG':
      return action.payload;
      case 'CLEAR_TAG':
      return {};
    default:
      return state;
  }
};


export default tagReducer;