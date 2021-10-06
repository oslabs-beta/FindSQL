import React, { useState, useEffect } from 'react';
import Tables from './Tables';

export default function Container() {
  const [database, setDatabase] = useState([]);

  //setDatabase(database.push(< Tables columns={obj} />))
  function getDatabase () {
    fetch('....')
      .then(res => res.json())
      .then(res => {
        for(let i = 0; i < res.length; i++){
          setDatabase(database.push(< Tables id={i} data={res[i]} />));
        }
      });
  // .then(res => {
  //   res.forEach(obj => {
    //     setDatabase(database.push(< Tables table={obj} />));
    //   });
    // });
  }

  return (
    <div>
      <div>
        <input type="text" placeholder="Your URI"/>
        <button type="submit" onClick={() => getDatabase()}></button>    
      </div>
      <div>
        { database }
      </div>
    </div>
  );
}