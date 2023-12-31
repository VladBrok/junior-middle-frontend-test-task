import "./index.css";
import { TABLE_DRAG_ITEM } from "constants/PlannerConstant";
import { useRef } from "react";
import { useDrop } from "react-dnd";
import { useSelector, useStore } from "react-redux";
import { addBoardTable, updateBoardTable } from "redux/actions/Planner";
import Utils from "utils";

const Board = ({ children }) => {
  const ref = useRef();
  const store = useStore();
  const availableTables = useSelector((state) => state.planner.availableTables);
  const boardTables = useSelector((state) => state.planner.boardTables);

  const [, drop] = useDrop({
    accept: TABLE_DRAG_ITEM,
    drop(item, monitor) {
      const offsetX =
        monitor.getInitialClientOffset().x -
        item.el.getBoundingClientRect().left;
      const offsetY =
        monitor.getInitialClientOffset().y -
        item.el.getBoundingClientRect().top;
      const tableRectLeft = monitor.getClientOffset().x - offsetX;
      const tableRectTop = monitor.getClientOffset().y - offsetY;
      const tableRectWidth = item.el.getBoundingClientRect().width;
      const tableRectHeight = item.el.getBoundingClientRect().height;
      const boardRect = ref.current.getBoundingClientRect();

      const top = tableRectTop - boardRect.top;
      const left = tableRectLeft - boardRect.left;
      const isOutsideOfBoard =
        top < 0 ||
        top > boardRect.height - tableRectHeight ||
        left < 0 ||
        left > boardRect.width - tableRectWidth;

      if (isOutsideOfBoard) {
        return;
      }

      const tableId = item.id;
      const isFromAvailable = availableTables.some(
        (table) => table.id === tableId
      );

      if (isFromAvailable) {
        const table = availableTables.find((table) => table.id === tableId);
        store.dispatch(addBoardTable(table, top, left));
      }

      const isFromBoard = boardTables.some((table) => table.id === tableId);
      Utils.assert(
        !isFromAvailable || !isFromBoard,
        `The table with id ${tableId} is both on the board and in the list of available tables.`
      );

      if (isFromBoard) {
        store.dispatch(updateBoardTable(tableId, top, left));
      }
    },
  });

  return (
    <div
      className="board__container"
      ref={(el) => {
        ref.current = el;
        drop(el);
      }}
    >
      {children}
    </div>
  );
};

export default Board;
