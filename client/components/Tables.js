import React, { useState, useEffect } from "react";
import Columns from "./Columns";

export default function Tables(props) {
  const [columns, setColumns] = useState([]);
  const [tableName, setTableName] = useState("");
  const [tableColor, setTableColor] = useState("#1bdfc9");

  function toggleColor() {
    if (tableColor === '#1bdfc9') {
      setTableColor("#c495fd")
    } else{
      setTableColor("#1bdfc9")
    }
  };

  useEffect(() => {
    const key = Object.keys(props.data)[0];
    setTableName(key);

    const updatedTable = [];
    props.data[key].forEach((col) => {
      updatedTable.push(
        <div className="column">
          <Columns
            key={props.data[key].indexOf(col)}
            columns={col}
            tableName={key}
            isOn={props.isOn}
            color={props.color}
          />
        </div>
      );
    });
    setColumns(updatedTable);
  }, []);

  return (
    <div>
      <div className="tableName">
        <button
          className="tableButton"
          style={{background: tableColor}}
          onClick={() => {
            props.isOn(tableName);
            {toggleColor()}
          }}
        >
          {tableName}
        </button>
      </div>
      <div className="table">{columns}</div>
    </div>
  );
}
