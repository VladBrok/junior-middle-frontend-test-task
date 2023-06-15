import "./index.css";
import { TABLE_DRAG_ITEM } from "constants/PlannerConstant";
import { useDrop } from "react-dnd";

const AvailableTables = ({ children, onDrop }) => {
  const [, drop] = useDrop({
    accept: TABLE_DRAG_ITEM,
    drop(item) {
      onDrop(item);
    },
  });

  return (
    <div ref={drop} className="available-tables__container">
      {children}
    </div>
  );
};

export default AvailableTables;
