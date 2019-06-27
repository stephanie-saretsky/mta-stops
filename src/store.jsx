import { createStore } from "redux";

let reducer = (state, action) => {
  if (action.type === "stop-list") {
    return { ...state, stops: action.stops };
  }
  if (action.type === "shapes") {
    return { ...state, shapes: action.shapes };
  }
  return state;
};

let store = createStore(
  reducer,
  {
    stops: [],
    shapes: []
  },
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
