import React, { useState, useEffect } from 'react';

export default function Columns(props) {
  // console.log(props);
  return (
    <button className="columnButton" onClick={() => props.isOn(props.tableName, props.columns) }>{ props.columns }</button>
  );
}

///{props.isRowOn(props.tableName, props.columns)}