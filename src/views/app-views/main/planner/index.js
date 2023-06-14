import plannerTables from "assets/data/planner-tables.data.json";
import { TABLE_DRAG_ITEM } from "constants/PlannerConstant";
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

const Planner = () => {
  const [availableTables, setAvailableTables] = useState(plannerTables);

  const moveTable = (oldIdx, newIdx) => {
    const tables = Utils.moveItem(availableTables, oldIdx, newIdx);
    setAvailableTables(tables);
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
      </DndProvider>
    </>
  );
};

export default Planner;
