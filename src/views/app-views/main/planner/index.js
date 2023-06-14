import plannerTables from "assets/data/planner-tables.data.json";
import { getEmptyImage } from "react-dnd-html5-backend";
import { TABLE_DRAG_ITEM } from "constants/PlannerConstant";
import "./index.css";
import { useRef, useState, useEffect } from "react";
import Utils from "utils";
import { DndProvider, useDrag, useDrop, useDragLayer } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

// TODO: split all components into multiple files (don't forget about moving css)
// TODO: move to .css
const layerStyles = {
  position: "fixed",
  pointerEvents: "none",
  zIndex: 100,
  left: 0,
  top: 0,
  width: "100%",
  height: "100%",
};

function getItemStyles(initialOffset, currentOffset) {
  if (!initialOffset || !currentOffset) {
    return {
      display: "none",
    };
  }
  let { x, y } = currentOffset;

  const transform = `translate(${x}px, ${y}px)`;
  return {
    transform,
    WebkitTransform: transform,
  };
}

export const CustomDragLayer = () => {
  const { itemType, isDragging, item, initialOffset, currentOffset } =
    useDragLayer((monitor) => ({
      item: monitor.getItem(),
      itemType: monitor.getItemType(),
      initialOffset: monitor.getInitialSourceClientOffset(),
      currentOffset: monitor.getSourceClientOffset(),
      isDragging: monitor.isDragging(),
    }));

  function renderItem() {
    switch (itemType) {
      case TABLE_DRAG_ITEM:
        return <PlannerTable {...item} />;
      default:
        return null;
    }
  }

  if (!isDragging) {
    return null;
  }

  return (
    <div style={layerStyles}>
      <div style={getItemStyles(initialOffset, currentOffset)}>
        {renderItem()}
      </div>
    </div>
  );
};

function AvailableTables({ children, onDrop }) {
  const [, drop] = useDrop({
    accept: TABLE_DRAG_ITEM,
    drop(item) {
      onDrop(item);
    },
  });

  return (
    <div ref={drop} className="planner__list-container">
      {children}
    </div>
  );
}

function PlannerTable({
  id,
  index,
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
      if (!ref.current || item.isOnBoard) {
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
    item: () => ({
      id,
      index,
      isOnBoard,
      image,
      move,
    }),
    collect(monitor) {
      return {
        isDragging: monitor.isDragging(),
      };
    },
  });

  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true });
  }, [preview]);

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

  const [, drop] = useDrop({
    accept: TABLE_DRAG_ITEM,
    drop(item, monitor) {
      console.log("board drop");

      // TODO: this is weird (happens when hovering)
      // TODO: mb force this component to rerender so that getClientOffset updates ???????
      if (!monitor.getClientOffset()) {
        return;
      }

      const boardRect = ref.current.getBoundingClientRect();

      // TODO: instead of monitor.getClientOffset we should use tableRect.top & tableRect.left, but they are not updated. Find a way to deal with it

      const top = monitor.getClientOffset().y - boardRect.top;
      const left = monitor.getClientOffset().x - boardRect.left;
      const isOutsideOfBoard =
        top < 0 || top > boardRect.height || left < 0 || left > boardRect.width;

      // TODO: also check for intersection with others
      if (isOutsideOfBoard) {
        return;
      }

      onDrop(item.id, top, left);
      return undefined;
    },
  });

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

  const handleAvailableListDrop = (tableProps) => {
    if (!tableProps.isOnBoard) {
      return;
    }

    const boardTable = boardTables.find((x) => x.id === tableProps.id);
    Utils.assert(
      boardTable,
      `Table with id ${tableProps.id} is not found in boardTables.`
    );

    setBoardTables((prev) => prev.filter((x) => x.id !== tableProps.id));
    setAvailableTables((prev) => [...prev, boardTable]);
  };

  const handleBoardDrop = (tableId, top, left) => {
    const isFromAvailable = availableTables.some(
      (table) => table.id === tableId
    );

    if (isFromAvailable) {
      const table = availableTables.find((table) => table.id === tableId);
      setAvailableTables((prev) => prev.filter((x) => x.id !== tableId));
      setBoardTables((prev) => [...prev, { ...table, top, left }]);
    }

    const isFromBoard = boardTables.some((table) => table.id === tableId);
    Utils.assert(
      !isFromAvailable || !isFromBoard,
      `The table with id ${tableId} is both on the board and in the list of available tables.`
    );

    if (isFromBoard) {
      const table = boardTables.find((table) => table.id === tableId);
      setBoardTables((prev) =>
        prev.map((x) => (x === table ? { ...x, top, left } : x))
      );
    }
  };

  return (
    <>
      <DndProvider backend={HTML5Backend}>
        <CustomDragLayer />

        <AvailableTables onDrop={handleAvailableListDrop}>
          {availableTables.map((table, index) => (
            <PlannerTable
              key={table.id}
              id={table.id}
              image={table.image}
              index={index}
              move={moveTable}
            />
          ))}
        </AvailableTables>

        <Board onDrop={handleBoardDrop}>
          {boardTables.map((table, index) => (
            <PlannerTable
              key={table.id}
              id={table.id}
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
