 import React, { useState, useEffect } from 'react';

export default function SideValue(props) {

  return (
    <button className="sideValueButton" id={props.tempId} style={{background: props.color}} onClick={() => {
      {props.isValueOn(props.value, props.table, props.column, props.color)}
    }}>{props.value} </button>
  );
}