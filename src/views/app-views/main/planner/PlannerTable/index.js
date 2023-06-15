import "./index.css";
import { Image } from "antd";
import { getEmptyImage } from "react-dnd-html5-backend";
import { TABLE_DRAG_ITEM } from "constants/PlannerConstant";
import { useRef, useEffect } from "react";
import { useDrag } from "react-dnd";

const PlannerTable = ({
  id,
  index,
  image,
  isOnBoard = false,
  top = 0,
  left = 0,
}) => {
  const ref = useRef();

  const [{ isDragging }, drag, preview] = useDrag({
    type: TABLE_DRAG_ITEM,
    item: () => ({
      id,
      index,
      isOnBoard,
      image,
      el: ref.current,
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

  drag(ref);

  const opacity = isDragging ? 0 : 1;

  return (
    <div
      ref={ref}
      className={`planner-table ${isOnBoard ? "planner-table_board" : ""}`}
      style={{ opacity, top, left }}
    >
      <Image src={image} preview={false} />
    </div>
  );
};

export default PlannerTable;
