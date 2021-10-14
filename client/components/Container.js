import React, { useState, useEffect } from 'react';
import Tables from './Tables';
import QueryGenerator from './QueryGenerator';
import axios from 'axios';
import { json } from 'body-parser';

//postgres://hdyovvhb:AdLaNCcnn6hQ939_Hq1ba44_qTfnEdUN@chunee.db.elephantsql.com/hdyovvhb

let globalQueryData; 
export default function Container(props) {
  const [database, setDatabase] = useState([]);
  const [queryTableData, setQueryTableData] = useState([]);

  function getDatabase (uri) {
    
    console.log(uri);
    
    const myURI = {
      uri: uri,
    };

    fetch('/test', { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(myURI),
    })
      .then(res => res.json())
      .then(res => {
        const updatedDatabase = [];
        const arrTableNames = [];
        for(let i = 0; i < res.length; i++){
          // setDatabase(database.push(< Tables id={i} data={res[i]} />));
          for(let key in res[i]){
            const currentName = {};
            currentName[key] = false;
            arrTableNames.push(currentName);
          }
          updatedDatabase.push( <div className="card">
            < Tables key={i} data={res[i]} isOn={isOn}/> 
          </div>);
        }
        setQueryTableData(arrTableNames);
        setDatabase(updatedDatabase);
      });
  }
     
  globalQueryData = queryTableData;
  
  function isOn(currentTable){
    const newArr = [];
    for(let obj of globalQueryData){
      if(obj.hasOwnProperty(currentTable)){
        obj[currentTable] = !obj[currentTable];
        newArr.push(obj); 
      } else {
        newArr.push(obj);
      }
    }
    setQueryTableData(newArr);
  }

  // console.log(queryTableData), "June this is for yaaaa to see";
  return (
    <div>
      <div className="inputURI">
        <input id = "URI" type="text" placeholder="Your URI"/>
        <button type="submit" onClick={() => getDatabase(document.getElementById('URI').value)}>Get Data</button>    
      </div>
      <div>
        < QueryGenerator queryData = { queryTableData } />
      </div>
      <div className="database">
        { database }
      </div>
    </div>
  );
}