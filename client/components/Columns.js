import React, { useState, useEffect } from 'react';

export default function Columns(props) {
  return (
    <button className="columnButton">{props.columns}</button>
  );
}