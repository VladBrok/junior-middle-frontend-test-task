import { saveAs } from "file-saver";
import { Button, Upload } from "antd";
import { DownloadOutlined, UploadOutlined } from "@ant-design/icons";
import Utils from "utils";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import CustomDragLayer from "./CustomDragLayer";
import PlannerTable from "./PlannerTable";
import AvailableTables from "./AvailableTables";
import Board from "./Board";
import { useSelector, useStore } from "react-redux";
import {
  addAvailableTable,
  addBoardTable,
  initializePlanner,
  updateBoardTable,
} from "redux/actions/Planner";

const Planner = () => {
  const store = useStore();
  const availableTables = useSelector((state) => state.planner.availableTables);
  const boardTables = useSelector((state) => state.planner.boardTables);

  const handleAvailableListDrop = (tableProps) => {
    if (!tableProps.isOnBoard) {
      return;
    }

    const boardTable = boardTables.find((x) => x.id === tableProps.id);
    Utils.assert(
      boardTable,
      `Table with id ${tableProps.id} is not found in boardTables.`
    );

    store.dispatch(addAvailableTable(boardTable));
  };

  const handleBoardDrop = (tableId, top, left) => {
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
  };

  const handleExportClick = () => {
    const data = boardTables.map((table) => ({
      id: table.id,
      typeId: table.typeId,
      top: table.top,
      left: table.left,
    }));
    const fileName = "layout.json";
    const blob = new Blob([JSON.stringify(data)], {
      type: "application/json",
    });
    saveAs(blob, fileName);
  };

  const handleImportChange = async ({ file }) => {
    let text;
    try {
      text = await file.originFileObj.text();
    } catch (e) {
      Utils.handleError(
        e,
        "Не удалось считать данные из файла. Попробуйте выбрать другой."
      );
      return;
    }

    let parsed;
    try {
      parsed = JSON.parse(text);
      Utils.validateParsedPlannerData(parsed);
    } catch (e) {
      Utils.handleError(
        e,
        "Содержимое файла имеет некорректный формат. Попробуйте выбрать другой файл."
      );
      return;
    }

    store.dispatch(initializePlanner(parsed));
  };

  return (
    <>
      <div className="mb-3">
        <Upload
          accept=".json"
          onChange={handleImportChange}
          showUploadList={false}
          customRequest={() => {}}
        >
          <Button
            type="primary"
            ghost
            icon={<UploadOutlined />}
            className="mr-3"
          >
            Импорт
          </Button>
        </Upload>
        <Button
          type="primary"
          ghost
          icon={<DownloadOutlined />}
          disabled={!boardTables.length}
          onClick={handleExportClick}
        >
          Экспорт
        </Button>
      </div>

      <DndProvider backend={HTML5Backend}>
        <CustomDragLayer />

        <AvailableTables onDrop={handleAvailableListDrop}>
          {availableTables.map((table, index) => (
            <PlannerTable
              key={table.id}
              id={table.id}
              image={table.image}
              index={index}
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
