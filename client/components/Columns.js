import React, { useState, useEffect } from "react";

export default function Columns(props) {
  // console.log(props);
  const [columnColor, setColumnColor] = useState("transparent");

  function toggleColor() {
    if (columnColor === "transparent") {
      setColumnColor("#f14647");
    } else {
      setColumnColor("transparent");
    }
  }

  return (
    <button
      className="columnButton"
      style={{ background: columnColor }}
      onClick={() => {
        props.isOn(props.tableName, props.columns);
        {
          toggleColor();
        }
      }}
    >
      {props.columns}
    </button>
  );
}

///{props.isRowOn(props.tableName, props.columns)}
