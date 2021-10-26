import React, { useState, useEffect } from 'react';
import Columns from './Columns';


export default function Tables(props) {
  const [columns, setColumns] = useState([]);
  const [tableName, setTableName] = useState('');
  const [tableColor, setTableColor] = useState('black');

  function toggleColor() {
    if (tableColor === 'black') {
      setTableColor('red');
    } else {
      setTableColor('black');
    }
  }
  useEffect(() => {
    const key = Object.keys(props.data)[0];
    setTableName(key);

    const updatedTable = [];
    props.data[key].forEach(col => {
      updatedTable.push(
        <div className="column">
          < Columns key={props.data[key].indexOf(col)} columns={col} tableName={key} isOn={props.isOn} color={props.color} />
        </div>
      );
    });
    setColumns(updatedTable);
  }, []);

  return (
    <div>
      <div className="tableName">
        <button style={{ color: tableColor }} className="tableButton" onClick={() => {
          { props.isOn(tableName) }
          { toggleColor() }
        }} >{tableName}</button>
      </div>
      <div className="table">
        {columns}
      </div>
    </div>
  );
}
