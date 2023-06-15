import "./index.css";
import { TABLE_DRAG_ITEM } from "constants/PlannerConstant";
import { useRef } from "react";
import { useDrop } from "react-dnd";

const Board = ({ children, onDrop }) => {
  const ref = useRef();

  const [, drop] = useDrop(
    () => ({
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

        onDrop(item.id, top, left);
        return undefined;
      },
    }),
    [onDrop]
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

export default Board;
