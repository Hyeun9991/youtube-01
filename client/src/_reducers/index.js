import { combineReducers } from "redux";
import user from './user_reducer';

// 여러가지 reducer를 하나로 합쳐줌
const rootReducer = combineReducers({
  user,
});

export default rootReducer;
