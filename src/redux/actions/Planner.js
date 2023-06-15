import {
  MOVE_TABLE,
  ADD_AVAILABLE_TABLE,
  ADD_BOARD_TABLE,
  UPDATE_BOARD_TABLE,
  INITIALIZE_PLANNER,
} from "redux/constants/Planner";

export const moveTable = (oldIdx, newIdx) => {
  return {
    type: MOVE_TABLE,
    payload: { oldIdx, newIdx },
  };
};

export const addAvailableTable = (table) => {
  return {
    type: ADD_AVAILABLE_TABLE,
    payload: table,
  };
};

export const addBoardTable = (table, top, left) => {
  return {
    type: ADD_BOARD_TABLE,
    payload: { table, top, left },
  };
};

export const updateBoardTable = (id, top, left) => {
  return {
    type: UPDATE_BOARD_TABLE,
    payload: { id, top, left },
  };
};

export const initializePlanner = (importedBoardTables) => {
  return {
    type: INITIALIZE_PLANNER,
    payload: importedBoardTables,
  };
};
