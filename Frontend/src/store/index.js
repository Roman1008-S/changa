import { createStore, applyMiddleware, compose } from "redux";
import * as ReduxThunk from 'redux-thunk';
import rootReducer from "./reducers";

const initialState = {};
const middleware = [ReduxThunk.thunk];

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  initialState,
  composeEnhancers(applyMiddleware(...middleware))
);

export default store;