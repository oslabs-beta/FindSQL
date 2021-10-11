import React, { useState, useEffect } from 'react';
import Tables from './Tables';
import QueryGenerator from './QueryGenerator';
import axios from 'axios';

export default function Container() {
  const [database, setDatabase] = useState([]);
  // const [queryTable, setQueryTable] = useState('');

  //setDatabase(database.push(< Tables columns={obj} />))
  function getDatabase (uri) {
    //we still keep the /test endpoint but we maybe want to incorporate string interpolation to include the URI that we grab
    //from the input box
    console.log(uri);
    //fetch(`/test/uri`)
    fetch('/test')
      .then(res => res.json())
      .then(res => {
        const updatedDatabase = [];
        for(let i = 0; i < res.length; i++){
          // setDatabase(database.push(< Tables id={i} data={res[i]} />));
          updatedDatabase.push(
            <div className="card">
              < Tables key={i} data={res[i]}/>
            </div>
          );
        }
        setDatabase(updatedDatabase);
      });
  // .then(res => {
  //   res.forEach(obj => {
    //     setDatabase(database.push(< Tables table={obj} />));
    //   });
    // });
  }

  return (
    <div>
      <div className="inputURI">
        <input id = "URI" type="text" placeholder="Your URI"/>
        <button type="submit" onClick={() => getDatabase(document.getElementById('URI').value)}>Get Data</button>    
      </div>
      <div>
        < QueryGenerator />
      </div>
      <div className="database">
        { database }
      </div>
    </div>
  );
}