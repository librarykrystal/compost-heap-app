const heapReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_HEAP':
      return action.payload;
    default:
      return state;
  }
};

export default heapReducer;