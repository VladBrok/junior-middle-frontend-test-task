import "./index.css";
import { TABLE_DRAG_ITEM } from "constants/PlannerConstant";
import { useDrop } from "react-dnd";
import { useSelector, useStore } from "react-redux";
import { addAvailableTable } from "redux/actions/Planner";
import Utils from "utils";

const AvailableTables = ({ children }) => {
  const store = useStore();
  const boardTables = useSelector((state) => state.planner.boardTables);

  const [, drop] = useDrop({
    accept: TABLE_DRAG_ITEM,
    drop(item) {
      if (!item.isOnBoard) {
        return;
      }

      const boardTable = boardTables.find((x) => x.id === item.id);
      Utils.assert(
        boardTable,
        `Table with id ${item.id} is not found in boardTables.`
      );
      store.dispatch(addAvailableTable(boardTable));
    },
  });

  return (
    <div ref={drop} className="available-tables__container">
      {children}
    </div>
  );
};

export default AvailableTables;
