import React, { useState, useEffect } from "react";
import SideValue from "./SideValue";

export default function SideTable(props) {
  const { data, table, column, isValueOn } = props;

  const values = [];
  const keyValues = new Set();
  //find matching table name
  for (let tableNameData of data) {
    //table name matches passed in table name
    if (Object.prototype.hasOwnProperty.call(tableNameData, table))
      //find column name passed in

      for (let val of tableNameData["column_rows"]) {
        const colName = Object.keys(val)[0];
        const colorKey = Object.keys(val);
        const color = val[colorKey]["color"];
        //isolate column value
        const keyValue = Object.keys(val[colName]);
        // console.log(color);
        //we're setting up the below conditional to filter out values that either repeat themselves, are null, or any other value that is irrelevant or not useful
        if (
          colName === column &&
          !keyValues.has(keyValue[0]) &&
          keyValue[0] !== "null" &&
          keyValue[0] !== null &&
          keyValue[0] !== "n/a"
        ) {
          //create element to render
          // console.log(keyValue, colName);
          keyValues.add(keyValue[0]);
          const tempId = `${colName}${keyValue}`;
          values.push(
            // pass down sideValue , isValueOn(keyValue[0], table, column)
            <div>
              <SideValue
                tempId={tempId}
                value={keyValue[0]}
                isValueOn={isValueOn}
                table={table}
                column={column}
                color={color}
              />
            </div>
          );
        }
      }
  }
  //render all p elements
  return (
    <div className="sideTableWrapper">
      <div className="sideTableName">
        <h4>{`${table}.${column}`}</h4> 
      </div>
      <div className="sideTable">
        {values}
      </div>
    </div>
  );
}
