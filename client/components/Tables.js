import React, { useState, useEffect } from 'react';
import Columns from './Columns';


export default function Tables(props) {
  const [columns, setColumns] = useState([]);
  const [tableName, setTableName] = useState('');
  
  useEffect(() => {
    const key = Object.keys(props.data)[0];
    setTableName(key);
    
    const updatedTable = [];
    props.data[key].forEach(col => {
      updatedTable.push(
        <div className="column">
          < Columns key={props.data[key].indexOf(col)} columns={col} tableName={key} isOn={props.isOn}/>
        </div>
      );
    });
    setColumns(updatedTable);
  }, []);
  
  return (
    <div>
      <div className="tableName">
        <button className="tableButton" onClick={() => {props.isOn(tableName)}}>{ tableName }</button>
      </div>
      <div className="table">
        { columns }
      </div>
    </div>
  );
}
