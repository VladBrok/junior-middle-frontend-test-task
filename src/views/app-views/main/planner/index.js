import plannerTables from "assets/data/planner-tables.data.json";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import {
  AVAILABLE_TABLES_DROPPABLE_ID,
  BOARD_DROPPABLE_ID,
  TABLE_DRAG_ITEM,
} from "constants/PlannerConstant";
import { List } from "antd";
import "./index.css";
import { useRef, useState } from "react";
import Utils from "utils";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function PlannerTable({ id, index, description, image, move }) {
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
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      move(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: TABLE_DRAG_ITEM,
    item: () => ({ id, index }),
    collect(monitor) {
      return {
        isDragging: monitor.isDragging(),
      };
    },
  });

  drag(drop(ref));

  const opacity = isDragging ? 0 : 1;

  return (
    <div
      ref={ref}
      data-handler-id={handlerId}
      className="planner__item"
      style={{ opacity }}
    >
      {id}
    </div>
  );
}

// TODO: remove commented code

const Planner = () => {
  // const [availableTables, setAvailableTables] = useState(plannerTables);
  // const [boardTables, setBoardTables] = useState([]);
  // const tableRefs = useRef([]);
  // const boardRef = useRef();

  // const handleDragEnd = (result) => {
  //   console.log(result);

  //   const isDroppableSame =
  //     result.destination?.droppableId === result.source.droppableId;
  //   const isDroppedToAvailableTables =
  //     result.destination?.droppableId === AVAILABLE_TABLES_DROPPABLE_ID;
  //   const isDroppedToBoard = Utils.intersect(
  //     boardRef.current,
  //     tableRefs.current[
  //       (result.source.droppableId === AVAILABLE_TABLES_DROPPABLE_ID
  //         ? availableTables[result.source.index]
  //         : boardTables[result.source.index]
  //       ).key
  //     ]
  //   );

  //   // TODO: refactor: extract function for each condition
  //   if (isDroppableSame && isDroppedToAvailableTables) {
  //     const reordered = Utils.moveItem(
  //       availableTables,
  //       result.source.index,
  //       result.destination.index
  //     );
  //     setAvailableTables(reordered);
  //   } else if (!isDroppableSame && isDroppedToBoard) {
  //     const table = availableTables[result.source.index];

  //     const el = tableRefs.current[table.key];
  //     console.log(el);

  //     setBoardTables((prev) => [...prev, { ...table, top: 15, left: 20 }]);
  //     setAvailableTables((prev) => prev.filter((x) => x !== table));
  //   } else if (!isDroppableSame && isDroppedToAvailableTables) {
  //     const table = boardTables[result.source.index];
  //     const available = availableTables.slice();
  //     available.splice(result.destination.index, 0, table);
  //     setAvailableTables(available);
  //     setBoardTables((prev) => prev.filter((x) => x !== table));
  //   }
  // };

  const [availableTables, setAvailableTables] = useState(plannerTables);

  const moveTable = (oldIdx, newIdx) => {
    const tables = Utils.moveItem(availableTables, oldIdx, newIdx);
    setAvailableTables(tables);
  };

  return (
    <>
      <DndProvider backend={HTML5Backend}>
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
      </DndProvider>

      {/* <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable
          droppableId={AVAILABLE_TABLES_DROPPABLE_ID}
          direction="horizontal"
        >
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="planner__available-tables"
            >
              <List
                className="planner__list-container"
                dataSource={availableTables}
                renderItem={(table, index) => (
                  <Draggable
                    index={index}
                    key={table.key}
                    draggableId={table.key}
                  >
                    {(provided) => (
                      <div
                        ref={(el) => {
                          tableRefs.current[table.key] = el;
                          provided.innerRef(el);
                        }}
                        {...provided.dragHandleProps}
                        {...provided.draggableProps}
                        className="planner__item"
                      >
                        <div>{table.id}</div>
                      </div>
                    )}
                  </Draggable>
                )}
              />
              {provided.placeholder}
            </div>
          )}
        </Droppable>

        <Droppable
          droppableId={BOARD_DROPPABLE_ID}
          direction="horizontal"
          isDropDisabled={true}
        >
          {(provided) => (
            <div
              ref={(el) => {
                boardRef.current = el;
                provided.innerRef(el);
              }}
              {...provided.droppableProps}
              className="planner__board"
            >
              {boardTables.map((table, index) => (
                <Draggable
                  index={index}
                  key={table.key}
                  draggableId={table.key}
                >
                  {(provided) => (
                    <div
                      ref={(el) => {
                        tableRefs.current[table.key] = el;
                        provided.innerRef(el);
                      }}
                      {...provided.dragHandleProps}
                      {...provided.draggableProps}
                      className="planner__item planner__board-item"
                      style={{ top: table.top, left: table.left }}
                    >
                      <div>{table.id}</div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext> */}
    </>
  );
};

export default Planner;
