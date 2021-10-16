import React, { useState, useEffect } from 'react';
import Tables from './Tables';
import QueryGenerator from './QueryGenerator';
import axios from 'axios';
import { json } from 'body-parser';

//postgres://hdyovvhb:AdLaNCcnn6hQ939_Hq1ba44_qTfnEdUN@chunee.db.elephantsql.com/hdyovvhb

let globalQueryData; 
export default function Container(props) {
  // database is an array of Table components
  const [database, setDatabase] = useState([]);
  // isTableOn boolean switches signifying whether a table name has been selected
  const [queryTableData, setQueryTableData] = useState([]);
  // isRowOn boolean switches signifying whether a row in table name has be
  const [queryRowData, setQueryRowData] = useState([]); 
  //table name : table columns set false

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
        console.log(res, "inside fetch req");
        //store all table names with columns in this array
        const updatedDatabase = [];
        //updating table name switches data
        const arrTableNames = [];
        //updating column name switches data
        const tablesWithColumns = [];

        // [ { species: [{_id: false}, {name: false}] }, {...} ]

        for(let i = 0; i < res.length; i++){
          // setDatabase(database.push(< Tables id={i} data={res[i]} />));
          // tableNameForOnFunctions is the table name in the object in the response array
          const tableNameForOnFunctions = Object.keys(res[i])[0];
          const tableWithColumns = {};
          const columnArray = res[i][tableNameForOnFunctions];
          const array = [];

          for (let j = 0; j < columnArray.length; j++) {
            const object = {};
            object[columnArray[j]] = false;
            array.push(object);
          }
          
          tableWithColumns[tableNameForOnFunctions] = array;
          // push this element as the key into a new object and add a false value to it
          // push the tableName object into the tableswithcolumns array

          tablesWithColumns.push(tableWithColumns);
          // currentTableName object is for isTableOn functions
          const currentTableName = {};
          currentTableName[tableNameForOnFunctions] = false;
          arrTableNames.push(currentTableName);
          
          updatedDatabase.push( <div className="card">
            < Tables key={i} data={res[i]} isTableOn={isTableOn}/> 
          </div>);
        }
        setQueryRowData(tablesWithColumns);
        setQueryTableData(arrTableNames);
        setDatabase(updatedDatabase);
      });
  }
    

  console.log(queryRowData);
  globalQueryData = queryTableData;
 //{species : true}, {name : false},
  function isTableOn(currentTableName){
    const newArr = [];
    for(const obj of globalQueryData){
      if(Object.prototype.hasOwnProperty.call(obj, currentTableName)){
        obj[currentTableName] = !obj[currentTableName];
        newArr.push(obj); 
      } else {
        newArr.push(obj);
      }
    }
    setQueryTableData(newArr);
  }

  function isRowOn(currentTableString, currentRowString){
    // [{species: [{_id: false}, {name: false}]}, {...}]
      // [{_id: false}, {name: false}] 

      // []

      // iterate thru state & finding the obj w/ currentTableString as a key
         // 
      // set the key and value of that obj
      // push the obj into the array
    const newTableArr = [];

    for (const obj of queryRowData) {
      if (Object.prototype.hasOwnProperty.call(obj, currentTableString)) {
        const newColArr = [];
        for (const col of obj[currentTableString]){
          if (Object.prototype.hasOwnProperty.call(col, currentRowString)) {
            
            col[currentRowString] = !col[currentRowString];
            newColArr.push(col);
          } else {
            newColArr.push(col);
          }
        }
        newTableArr.push(newColArr);
      }
      else {
        newTableArr.push(obj);
      }
    setQueryRowData(newTableArr);
  };

  return (
    <div>
      <div className="inputURI">
        <input id="URI" type="text" placeholder="Your URI"/>
        <button type="submit" onClick={() => getDatabase(document.getElementById('URI').value)}><img src="../assets/click.png"></img></button>    
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