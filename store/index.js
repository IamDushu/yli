import { createStore, applyMiddleware, compose } from "redux";
import thunkMiddleware from "redux-thunk"; // redux middle-ware
import reducers from "@reducers"; //connect all reduce

const initialState = {}; // default redux state

const bindMiddleware = (middleware) => {
  if (process.env.NODE_ENV !== "production") {
    // I require this only in dev environment
    const { composeWithDevTools } = require("redux-devtools-extension");
    return composeWithDevTools(applyMiddleware(middleware));
  }
  return applyMiddleware(middleware);
};

export const RESET_STORE = 'RESET_STORE';

export function resetStore() {
  return { type: RESET_STORE };
}

function combinedReducers(state, action) {
  if (action.type === RESET_STORE) {
    state = undefined;
  }
  return reducers(state, action);
}

export default createStore(
  combinedReducers,
  initialState,
  bindMiddleware(thunkMiddleware)
);