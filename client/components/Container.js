import React, { useState, useEffect } from "react";
import Tables from "./Tables";
import QueryGenerator from "./QueryGenerator";
import axios from "axios";
import { json } from "body-parser";

// postgres://hdyovvhb:AdLaNCcnn6hQ939_Hq1ba44_qTfnEdUN@chunee.db.elephantsql.com/hdyovvhb
// { species: [{_id: false}, {name: false}],
//   isSelected: false }
// let globalQueryData;
let globalQueryRowData;
export default function Container(props) {
  // database is an array of Table components
  const [database, setDatabase] = useState([]);
  // isTableOn boolean switches signifying whether a table name has been selected
  // const [queryTableData, setQueryTableData] = useState([]);
  // isRowOn boolean switches signifying whether a row in table name has be
  const [queryRowData, setQueryRowData] = useState([]);
  //table name : table columns set false

  function getDatabase(uri) {
    console.log(uri);

    const myURI = {
      uri: uri,
    };

    fetch("/test", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(myURI),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res, "inside fetch req");
        //store all table names with columns in this array
        const updatedDatabase = [];
        //updating table name switches data
        // const arrTableNames = [];
        //updating column name switches data
        const tablesWithColumns = [];

        // [ { species: [{_id: false}, {name: false}] }, {...} ]

        // [ {species: ["_id", "name", ...], foreign_table: string, fk_column: string}, {...} ]

        for (let i = 0; i < res.length; i++) {
          // setDatabase(database.push(< Tables id={i} data={res[i]} />));
          // tableName is the table name in the object in the response array
          const tableName = Object.keys(res[i])[0];
          const newTable = {};
          const columnArr = res[i][tableName];
          const newColumnArr = [];

          for (let j = 0; j < columnArr.length; j++) {
            const object = {};
            object[columnArr[j]] = false;
            newColumnArr.push(object);
          }
          //this is where we build out all of the key/value pairs for the table object
          newTable[tableName] = newColumnArr;
          newTable["isSelected"] = false;
          newTable["foreign_table"] = res[i]["foreign_table"];
          newTable["foreign_column"] = res[i]["foreign_column"];
          // push this element as the key into a new object and add a false value to it
          // push the tableName object into the tableswithcolumns array
          // console.log('logging the new table', newTable);
          tablesWithColumns.push(newTable);
          // currentTableName object is for isTableOn functions
          // const currentTableName = {};
          // currentTableName[tableName] = false;
          // arrTableNames.push(currentTableName);

          updatedDatabase.push(
            <div className="card">
              <Tables key={i} data={res[i]} isOn={isOn} />
            </div>
          );
        }
        setQueryRowData(tablesWithColumns);
        // setQueryTableData(arrTableNames);
        setDatabase(updatedDatabase);
      });
  }

  //original code before darrens idea: < Tables key={i} data={res[i]} isTableOn={isTableOn} isRowOn={isRowOn}/>
  // globalQueryData = queryTableData;
  // //{species : true}, {name : false},
  // function isTableOn(currentTableName){
  //   const newArr = [];
  //   for(const obj of globalQueryData){
  //     if(Object.prototype.hasOwnProperty.call(obj, currentTableName)){
  //       obj[currentTableName] = !obj[currentTableName];
  //       newArr.push(obj);
  //     } else {
  //       newArr.push(obj);
  //     }
  //   }
  //   setQueryTableData(newArr);
  // }

  globalQueryRowData = queryRowData;
  function isRowOn(currentTableString, currentRowString) {
    // [{species: false}, {planets: false}]

    // { species: [{_id: false}, {name: false}],
    //   isSelected: false }
    const newTableArr = [];
    for (const obj of globalQueryRowData) {
      if (Object.prototype.hasOwnProperty.call(obj, currentTableString)) {
        const newColArr = [];
        for (const col of obj[currentTableString]) {
          if (Object.prototype.hasOwnProperty.call(col, currentRowString)) {
            col[currentRowString] = !col[currentRowString];
            newColArr.push(col);
          } else {
            newColArr.push(col);
          }
        }
        // change objects tableString value to newColArr
        obj[currentTableString] = newColArr;
        newTableArr.push(obj);
      } else {
        newTableArr.push(obj);
      }
    }
    // console.log(newTableArr);
    setQueryRowData(newTableArr);
  }

  function isOn(tableName, rowName) {
    // make a empty array
    const newArr = [];
    // check if there isnt a 2nd arg
    if (!rowName) {
      // if no...
      // iterate thru queryRowData
      for (const obj of globalQueryRowData) {
        // for every obj...
        // if (obj.hasOwnProperty(tableName))
        if (Object.prototype.hasOwnProperty.call(obj, tableName)) {
          // toggle value to the opposite of what it is
          obj["isSelected"] = !obj["isSelected"];
          // push this obj into empty array
          newArr.push(obj);
        } else {
          // if not,
          // push this obj into empty array
          newArr.push(obj);
        }
      }
    } else {
      // if yes, run args thru return isRowOn(...)
      return isRowOn(tableName, rowName);
    }
    // setQueryRowData(new array)
    setQueryRowData(newArr);
    // console.log(newArr);
  }

  console.log("this is queryRowData in container: ", queryRowData);

  //before darrens changes: < QueryGenerator queryTableData = { queryTableData } queryRowData = {queryRowData}/>
  return (
    <div>
      <div className="inputURI">
        <input id="URI" type="text" placeholder="Your URI" />
        <button
          type="submit"
          onClick={() => getDatabase(document.getElementById("URI").value)}
        >
          <img src="../assets/click.png"></img>
        </button>
      </div>
      <div>
        <QueryGenerator queryRowData={queryRowData} />
      </div>
      <div className="database">{database}</div>
      <div className="database">{database}</div>
    </div>
  );
}
