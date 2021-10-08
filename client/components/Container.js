import React, { useState, useEffect } from 'react';
import Tables from './Tables';
import axios from 'axios';

export default function Container() {
  const [database, setDatabase] = useState([]);

  //setDatabase(database.push(< Tables columns={obj} />))
  function getDatabase () {
    fetch('/test')
      .then(res => res.json())
      .then(res => {
        const updatedDatabase = [];
        for(let i = 0; i < res.length; i++){
          // setDatabase(database.push(< Tables id={i} data={res[i]} />));
          updatedDatabase.push(
            <div className="card">
              < Tables key={i} data={res[i]} />
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
        <input type="text" placeholder="Your URI"/>
        <button type="submit" onClick={() => getDatabase()}>Get Data</button>    
      </div>
      <div className="database">
        { database }
      </div>
    </div>
  );
}