import React, { useState, useEffect } from "react";
import SideTable from "./SideTable";

export default function Sidebar(props) {
  //iterate through data and check if any rows are highlighted
  let columnsToRender = [];

  for (let table of props.data) {
    const tableName = Object.keys(table)[0];
    for (let value of table[tableName]) {
      const columnKey = Object.keys(value)[0];
      if (value[columnKey]) {
        columnsToRender.push([tableName, columnKey]);
      }
    }
  }

  const sideTables = [];
  if (columnsToRender.length) {
    for (let column of columnsToRender) {
      const tableName = column[0];
      const tableColumn = column[1];
      sideTables.unshift(
        <SideTable
          isValueOn={props.isValueOn}
          table={tableName}
          column={tableColumn}
          data={props.data}
        ></SideTable>
      );
    }
  }
  return (
    <div>
      <div className="logOutBar">
        <h2>
          Hello, <span>{props.email}</span>
        </h2>
        <button className="logOut" onClick={props.logUserOut}>
          Log Out
        </button>
      </div>
      <div class="sideTableContainer">{sideTables}</div>
    </div>
  );
}
