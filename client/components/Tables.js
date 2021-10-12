import React, { useState, useEffect } from 'react';
import Columns from './Columns';

//{people: [columnData]}
//function component for Columns
export default function Tables(props) {
  const [table, setTable] = useState([]);
  const [data, setData] = useState(props.data);
  const [tableName, setTableName] = useState('');
  const [queryTable, setQueryTable] = useState('');

  useEffect(() => {
    console.log('this is the table component', table);

    const key = Object.keys(data)[0];
    setTableName(key);
    setQueryTable(`SELECT * FROM ${key}`);

    const updatedTable = [];
    data[key].forEach(col => {
      updatedTable.push(
        <div className="column">
          < Columns key={data[key].indexOf(col)} columns={col} />
        </div>
      );
    });
    setTable(updatedTable);
  }, []);
  //we want an onClick where if the table is clicked, it will generate a string "SELECT * FROM { tableName }"
  //initialize a hook for tableName query generator
  //onclick will change the state and change that state 
  return (
    <div>
      <div className="tableName">
        <button className="tableButton" onClick={() => console.log(queryTable)}>{ tableName }</button>
      </div>
      <div className="table">
        { table }
      </div>
    </div>
  );
}