import React, { useState, useEffect } from 'react';
import Columns from './Columns';


export default function Tables(props) {
  const [columns, setColumns] = useState([]);
  const [tableName, setTableName] = useState('');
<<<<<<< HEAD

=======
  const [tableColor, setTableColor] = useState('black');

  function toggleColor(){
    if(tableColor === 'black'){
      setTableColor('red');
    }else{
      setTableColor('black');
    }
  }
>>>>>>> b56c6eea9c9a96fcfd8a92b5a28309e209db1943
  useEffect(() => {
    const key = Object.keys(props.data)[0];
    setTableName(key);

    const updatedTable = [];
    props.data[key].forEach(col => {
      updatedTable.push(
        <div className="column">
<<<<<<< HEAD
          < Columns key={props.data[key].indexOf(col)} columns={col} tableName={key} isOn={props.isOn} />
=======
          < Columns key={props.data[key].indexOf(col)} columns={col} tableName={key} isOn={props.isOn} color={props.color}/>
>>>>>>> b56c6eea9c9a96fcfd8a92b5a28309e209db1943
        </div>
      );
    });
    setColumns(updatedTable);
  }, []);

  return (
    <div>
      <div className="tableName">
<<<<<<< HEAD
        <button className="tableButton" onClick={() => { props.isOn(tableName) }}>{tableName}</button>
=======
        <button style={{color: tableColor}} className="tableButton" onClick={() => {
          {props.isOn(tableName)}
          {toggleColor()}
          }} >{ tableName }</button>
>>>>>>> b56c6eea9c9a96fcfd8a92b5a28309e209db1943
      </div>
      <div className="table">
        {columns}
      </div>
    </div>
  );
}
