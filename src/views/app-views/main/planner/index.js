import plannerTables from "assets/data/planner-tables.data.json";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import {
  AVAILABLE_TABLES_DROPPABLE_ID,
  BOARD_DROPPABLE_ID,
} from "constants/PlannerConstant";
import { List } from "antd";
import "./index.css";
import { useRef, useState } from "react";
import Utils from "utils";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

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

  return (
    <>
      <DndProvider backend={HTML5Backend}></DndProvider>

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
