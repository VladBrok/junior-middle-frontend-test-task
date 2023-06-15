import Utils from "utils";
import {
  ADD_AVAILABLE_TABLE,
  ADD_BOARD_TABLE,
  INITIALIZE_PLANNER,
  MOVE_TABLE,
  UPDATE_BOARD_TABLE,
} from "redux/constants/Planner";

const initState = {
  availableTables: Utils.getPlannerTables(),
  boardTables: [],
};

const planner = (state = initState, action) => {
  switch (action.type) {
    case MOVE_TABLE: {
      const { oldIdx, newIdx } = action.payload;
      return {
        ...state,
        availableTables: Utils.moveItem(state.availableTables, oldIdx, newIdx),
      };
    }
    case ADD_AVAILABLE_TABLE: {
      return {
        ...state,
        availableTables: [...state.availableTables, action.payload],
        boardTables: state.boardTables.filter(
          (table) => table.id !== action.payload.id
        ),
      };
    }
    case ADD_BOARD_TABLE: {
      const { table, top, left } = action.payload;
      return {
        ...state,
        availableTables: state.availableTables.filter((x) => x.id !== table.id),
        boardTables: [...state.boardTables, { ...table, top, left }],
      };
    }
    case UPDATE_BOARD_TABLE: {
      const { id, top, left } = action.payload;
      return {
        ...state,
        boardTables: state.boardTables.map((table) =>
          table.id === id ? { ...table, top, left } : table
        ),
      };
    }
    case INITIALIZE_PLANNER: {
      const imported = action.payload;
      return {
        ...state,
        availableTables: Utils.getPlannerTables().filter(
          (table) => !imported.find((x) => x.id === table.id)
        ),
        boardTables: imported.map((table) => ({
          ...table,
          image: Utils.getTableImage(table.typeId),
        })),
      };
    }
    default:
      return state;
  }
};

export default planner;
