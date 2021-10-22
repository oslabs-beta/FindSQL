import React, { useState, useEffect } from "react";

export default function Sidebar(props) {
  const { data, table, column, isValueOn } = props;

  const values = [];
  //find matching table name
  for (let tableNameData of data) {
    //table name matches passed in table name
    if (Object.prototype.hasOwnProperty.call(tableNameData, table))
      //find column name passed in
      for (let val of tableNameData["column_rows"]) {
        const colName = Object.keys(val)[0];
        //isolate column value
        const keyValue = Object.keys(val[colName]);
        if (colName === column) {
          //create element to render
          values.push(
            <button onClick={() => isValueOn(keyValue[0], table, column)}>
              {keyValue[0]}
            </button>
          );
        }
      }
  }
  //render all p elements
  return (
    <div>
      <h2>{`${table}.${column}`}</h2>
      {values}
    </div>
  );
}
