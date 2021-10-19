import React, { useState, useEffect, useRef } from "react";
import queryGeneratorFunction from "../queryGeneratorFunction.js";

export default function queryGenerator(props) {
  //useEffect: anytime a value in the queryData changes (false/true), we want to reRender the query string
  //define a basic function that generates a simple query string based on the data this component received
  console.log(props.queryRowData);
  // const queryString = queryGeneratorFunction(props.queryData);

  // console.log(queryString);
  return (
    <div>
      <div className="inputURI">
        <button type="submit">
          <img src="../assets/copy.png"></img>
        </button>
        <input id="copyURL" type="text" value="hey" readOnly />
        {/* <h2 className="queryString">{ queryString }</h2> */}
      </div>
    </div>
  );
}
