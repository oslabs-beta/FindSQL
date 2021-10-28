import React, { useState, useEffect, useRef } from 'react';
import queryGeneratorFunction from '../queryGeneratorFunction.js';

export default function queryGenerator(props) {
  //useEffect: anytime a value in the queryData changes (false/true), we want to reRender the query string
  //define a basic function that generates a simple query string based on the data this component received
  
  const queryString = queryGeneratorFunction(props.queryRowData);
  //define a function for when we click the copy button
  function sendQueryString(string){
    //{querystring: { string }}
    const query = { queryString : string };

    // copies query string to clipboard
    navigator.clipboard.writeText(string);

    fetch('/query', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(query)
    })
      .then((res) => res.json())
      .then((res) => console.log('query object sent to the backend', res));
  }
  
  return (
    <div>
      <div className="inputURI">
        <input id="copyURL" type="text" value={ queryString } readOnly />
        <button className="copyButton" type="submit" onClick={() => sendQueryString(document.getElementById('copyURL').value)}>
          <img src="../assets/copywhite.png"></img>
        </button>
        {/* <h2 className="queryString">{ queryString }</h2> */}
      </div>
    </div>
  );
}