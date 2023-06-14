import plannerTables from "assets/data/planner-tables.data.json";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { AVAILABLE_TABLES_DROPPABLE_ID } from "constants/PlannerConstant";
import { List } from "antd";
import "./index.css";
import { useState } from "react";
import Utils from "utils";

const Planner = () => {
  const [availableTables, setAvailableTables] = useState(plannerTables);

  const handleDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const isDroppableSame =
      result.destination.droppableId === result.source.droppableId;
    const isDroppedToAvailableTables =
      result.destination.droppableId === AVAILABLE_TABLES_DROPPABLE_ID;

    if (isDroppableSame && isDroppedToAvailableTables) {
      const reordered = Utils.moveItem(
        availableTables,
        result.source.index,
        result.destination.index
      );
      setAvailableTables(reordered);
    }
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
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
              renderItem={(item, index) => (
                <Draggable index={index} key={item.key} draggableId={item.key}>
                  {(provided) => (
                    <List.Item
                      ref={provided.innerRef}
                      {...provided.dragHandleProps}
                      {...provided.draggableProps}
                      className="planner__list-item"
                    >
                      <div>{item.id}</div>
                    </List.Item>
                  )}
                </Draggable>
              )}
            />
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default Planner;
