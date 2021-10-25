import React, { useState, useEffect } from 'react';

export default function Columns(props) {
  // console.log(props);
  const [columnColor, setColumnColor] = useState('black');

  function toggleColor(){
    if(columnColor === 'black'){
      setColumnColor('red');
    }else{
      setColumnColor('black');
    }
  }

  return (
    <button className="columnButton" style={{color: columnColor}} onClick={() => {
      props.isOn(props.tableName, props.columns);
      {toggleColor();}
    } }>{ props.columns }</button>
  );
}

///{props.isRowOn(props.tableName, props.columns)}