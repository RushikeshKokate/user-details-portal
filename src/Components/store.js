import { createStore, applyMiddleware, combineReducers } from 'redux';
 
import { thunk } from "redux-thunk";
import {reducer} from "./reducer/reducer"
 

const rootReducer = combineReducers({
    form: reducer,
  });
  
  const store = createStore(rootReducer, applyMiddleware(thunk));
  
  export default store;