import plannerTables from "assets/data/planner-tables.data.json";
import { getEmptyImage } from "react-dnd-html5-backend";
import { TABLE_DRAG_ITEM } from "constants/PlannerConstant";
import "./index.css";
import { useRef, useState, useEffect } from "react";
import Utils from "utils";
import { DndProvider, useDrag, useDrop, useDragLayer } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function PlannerTable({
  id,
  index,
  description,
  image,
  move,
  isOnBoard = false,
  top = 0,
  left = 0,
}) {
  const ref = useRef();

  const [{ handlerId }, drop] = useDrop({
    accept: TABLE_DRAG_ITEM,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }

      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleX =
        (hoverBoundingRect.right - hoverBoundingRect.left) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientX = clientOffset.x - hoverBoundingRect.left;
      const isDraggingLeftwards = dragIndex > hoverIndex;
      const isDraggingRightwards = dragIndex < hoverIndex;
      const isCrossedHalfLeftwards = hoverClientX < hoverMiddleX;
      const isCrossedHalfRightwards = hoverClientX > hoverMiddleX;

      if (
        (isDraggingLeftwards && !isCrossedHalfLeftwards) ||
        (isDraggingRightwards && !isCrossedHalfRightwards)
      ) {
        return;
      }

      move(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag, preview] = useDrag({
    type: TABLE_DRAG_ITEM,
    item: () => ({ id, index, ref: ref.current }),
    collect(monitor) {
      return {
        isDragging: monitor.isDragging(),
      };
    },
  });

  // TODO
  // useEffect(() => {
  //   preview(getEmptyImage(), { captureDraggingState: true });
  // }, []);

  drag(drop(ref));

  const opacity = isDragging ? 0 : 1;

  return (
    <div
      ref={ref}
      data-handler-id={handlerId}
      className={`planner__item ${isOnBoard ? "planner__item-board" : ""}`}
      style={{ opacity, top, left }}
    >
      {id}
    </div>
  );
}

const Board = ({ children, onDrop }) => {
  const ref = useRef();

  const [, drop] = useDrop(
    () => ({
      accept: TABLE_DRAG_ITEM,
      drop(item, monitor) {
        const tableRect = item.ref.getBoundingClientRect();
        const boardRect = ref.current.getBoundingClientRect();

        // TODO: instead of monitor.getClientOffset we should use tableRect.top & tableRect.left, but they are not updated. Find a way to deal with it

        const top = monitor.getClientOffset().y - boardRect.top;
        const left = monitor.getClientOffset().x - boardRect.left;
        const isOutsideOfBoard =
          top < 0 ||
          top > boardRect.height ||
          left < 0 ||
          left > boardRect.width;

        if (isOutsideOfBoard) {
          console.log(
            top,
            left,
            boardRect.height - tableRect.height,
            boardRect.width - tableRect.width
          );
          return;
        }

        onDrop(item.id, top, left);
        return undefined;
      },
    }),
    []
  );

  return (
    <div
      className="planner__board"
      ref={(el) => {
        ref.current = el;
        drop(el);
      }}
    >
      {children}
    </div>
  );
};

const Planner = () => {
  const [availableTables, setAvailableTables] = useState(plannerTables);
  const [boardTables, setBoardTables] = useState([]);

  const moveTable = (oldIdx, newIdx) => {
    const tables = Utils.moveItem(availableTables, oldIdx, newIdx);
    setAvailableTables(tables);
  };

  const handleBoardDrop = (tableId, top, left) => {
    console.log("drop", tableId, top, left);

    const isFromAvailable = availableTables.some(
      (table) => table.id === tableId
    );

    if (isFromAvailable) {
      const table = availableTables.find((table) => table.id === tableId);
      setAvailableTables((prev) => prev.filter((x) => x !== table));
      setBoardTables((prev) => [...prev, { ...table, top, left }]);
    }
  };

  return (
    <>
      <DndProvider backend={HTML5Backend}>
        <div className="planner__list-container">
          {availableTables.map((table, index) => (
            <PlannerTable
              key={table.id}
              id={table.id}
              description={table.description}
              image={table.image}
              index={index}
              move={moveTable}
            />
          ))}
        </div>

        <Board onDrop={handleBoardDrop}>
          {boardTables.map((table, index) => (
            <PlannerTable
              key={table.id}
              id={table.id}
              description={table.description}
              image={table.image}
              index={index}
              move={moveTable}
              isOnBoard={true}
              top={table.top}
              left={table.left}
            />
          ))}
        </Board>
      </DndProvider>
    </>
  );
};

export default Planner;
