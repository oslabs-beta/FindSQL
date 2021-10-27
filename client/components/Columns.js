import React, { useState, useEffect } from "react";

export default function Columns(props) {
  // console.log(props);
  const [columnColor, setColumnColor] = useState("#dfe2e4");

  function toggleColor() {
    if (columnColor === "#dfe2e4") {
      setColumnColor("#f14647");
    } else {
      setColumnColor("#dfe2e4");
    }
  }

  return (
    <button
      className="columnButton"
      style={{ color: columnColor }}
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
