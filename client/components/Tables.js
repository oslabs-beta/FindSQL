import React, { useState, useEffect } from 'react';
import Columns from './Columns';

//{people: [columnData]}
//function component for Columns
export default function Tables(props) {
  const [table, setTable] = useState([]);
  const [data, setData] = useState(props.data);
  const [tableName, setTableName] = useState('');


  useEffect(() => {
    console.log('this is the table component', table);

    const key = Object.keys(data)[0];
    setTableName(key);

    const updatedTable = [];
    data[key].forEach(col => {
      updatedTable.push(< Columns key={data[key].indexOf(col)} columns={col} />);
    });
    setTable(updatedTable);
  }, []);

  return (
    <div>
      <div>
        { tableName }
      </div>
      <div>
        { table }
      </div>
    </div>
    
  );
}