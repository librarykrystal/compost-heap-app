const itemReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_IDEA':
      return action.payload;
    case 'CLEAR_IDEA':
      return {};
    default:
      return state;
  }
};

export default itemReducer;