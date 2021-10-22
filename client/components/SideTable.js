import React, { useState, useEffect } from 'react';

export default function Sidebar(props) {
  const { data, table, column, isValueOn } = props;

  const values = [];
  const keyValues = new Set;
  //find matching table name
  for (let tableNameData of data) {
    //table name matches passed in table name
    if (Object.prototype.hasOwnProperty.call(tableNameData, table))
      //find column name passed in
      
      for (let val of tableNameData['column_rows']) {
        const colName = Object.keys(val)[0];
        //isolate column value
        const keyValue = Object.keys(val[colName]);
        //we're setting up the below conditional to filter out values that either repeat themselves, are null, or any other value that is irrelevant or not useful
        if (colName === column && !keyValues.has(keyValue[0]) && keyValue[0] !== 'null' && keyValue[0] !== null && keyValue[0] !== 'n/a') {
          //create element to render
          // console.log(keyValue, colName);
          keyValues.add(keyValue[0]);
          values.push(
            <p onClick={() => isValueOn(keyValue[0], table, column)}>
              {keyValue[0]}
            </p>
          );
          
        }
      }
      // console.log(keyValues);
  }
  //render all p elements
  return (
    <div>
      <h2>{`${table}.${column}`}</h2>
      {values}
    </div>
  );
}
