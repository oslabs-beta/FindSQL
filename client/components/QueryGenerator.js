import React, { useState, useEffect, useRef } from 'react';
import queryGeneratorFunction from '../queryGeneratorFunction.js';

export default function queryGenerator(props) {
  console.log(props.queryData);
  //useEffect: anytime a value in the queryData changes (false/true), we want to reRender the query string
  //define a basic function that generates a simple query string based on the data this component received


  return(
    <div>
      <h3>This is the query genarator</h3>
      <h2>{queryGeneratorFunction(props.queryData)}</h2>
    </div>
    
  );
}

