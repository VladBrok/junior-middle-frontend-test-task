import { combineReducers } from "redux";
import Auth from "./Auth";
import Theme from "./Theme";
import Planner from "./Planner";

const reducers = combineReducers({
  theme: Theme,
  auth: Auth,
  planner: Planner,
});

export default reducers;
