import React, { useState, useEffect } from 'react';
import Columns from '/Columns';


//function component for Columns
export default function Tables() {
  const [table, setTable] = useState([]);
  const [data, setData] = useState(this.props.data);

  useEffect(() => {
    Object.keys(data).forEach(key => {
      setTable(table.push(< Columns id = {this.props.id} columns={key} />)); // key or value ? 
    });
  }, []);

  return (
    <div>
      { table }
    </div>
  );
}