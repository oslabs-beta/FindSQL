import React, { useState, useEffect } from "react";
import Tables from "./Tables";
import QueryGenerator from "./QueryGenerator";
import axios from "axios";
import { json } from "body-parser";
import Sidebar from "./Sidebar";

// postgres://hdyovvhb:AdLaNCcnn6hQ939_Hq1ba44_qTfnEdUN@chunee.db.elephantsql.com/hdyovvhb
let globalQueryRowData;
export default function Container(props) {
  // database is an array of Table components
  const [database, setDatabase] = useState([]);
  // isTableOn boolean switches signifying whether a table name has been selected
  // isRowOn boolean switches signifying whether a row in table name has be
  const [queryRowData, setQueryRowData] = useState([]);
  //table name : table columns set false
  
  function getDatabase(uri) {
    // console.log(uri);

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
        // console.log(res, "inside fetch req");
        //store all table names with columns in this array
        const updatedDatabase = [];
        //updating table name switches data
        // const arrTableNames = [];
        //updating column name switches data
        const tablesWithColumns = [];

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
          const columnDataArray = [];
          let count = 0;
          for (let row of res[i].columnData) {
            for (let columnName in row) {
              const rowObj = {};
              const rowToggle = {};
              rowToggle[row[columnName]] = false;
              rowObj[columnName] = rowToggle;
              columnDataArray.push(rowObj);
            }
          }
          //this is where we build out all of the key/value pairs for the table object
          newTable[tableName] = newColumnArr;
          newTable['isSelected'] = false;
          newTable['foreign_table'] = res[i]['foreign_table'];
          newTable['foreign_column'] = res[i]['foreign_column'];
          newTable['column_rows'] = columnDataArray;
          newTable['column_rows'].forEach(rowObj => {
            //{id: {5: false}}
            const key = Object.keys(rowObj)[0];
            rowObj[key]['color'] = 'black';
          });
          // console.log('this is column rows, ', newTable['column_rows'][0]);
          // push this element as the key into a new object and add a false value to it
          // push the tableName object into the tableswithcolumns array

          tablesWithColumns.push(newTable);
          // currentTableName object is for isTableOn functions

          updatedDatabase.push(
            <div className="card">
              <Tables key={i} data={res[i]} isOn={isOn}/>
            </div>
          );
        }
        setQueryRowData(tablesWithColumns);
        // setQueryTableData(arrTableNames);
        setDatabase(updatedDatabase);
      });
  }

  globalQueryRowData = queryRowData;
  function isRowOn(currentTableString, currentRowString) {
   
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
  //this function is to completely rebuild the queryRowData
  //from scratch. We are dealing with nested objects so the implementation
  //is tedious
  function isValueOn(valueName, valueTable, valueColumn, valueColor) {
    // if(valueColor === 'black'){
    //   valueColor = 'red';
    // }else{
    //   valueColor = 'black';
    // }
    const newQueryRowData = [];
    //iterate through data array and find correct tbale name
    for (let table of queryRowData) {
      const findTableName = Object.keys(table)[0];
      //if the table name matches look at all column values
      if (findTableName === valueTable) {
        const newObjForTableName = Object.assign(table, {});

        const newValuesForColumns = [];
        for (let values of table['column_rows']) {
          //grab column name
          const columnNameToFind = Object.keys(values)[0];

          //compare value to passed in value to find right column name
          if (columnNameToFind === valueColumn) {

            const changeVal = Object.keys(values[columnNameToFind])[0];
            
            if (changeVal === valueName) {
              
              values[columnNameToFind][changeVal] =
                !values[columnNameToFind][changeVal];
              // console.log('isValueOn',values[columnNameToFind]);
              if (values[columnNameToFind]['color'] === 'black') {
                values[columnNameToFind]['color'] = 'red';
              } else {
                values[columnNameToFind]['color'] = 'black';
              }
              
              newValuesForColumns.push(values);
            } else {
              newValuesForColumns.push(values);
            }
          } else {
            //if there is no match just push current value into new array
            newValuesForColumns.push(values);
          }
        }
        newObjForTableName["column_rows"] = newValuesForColumns;
        //at the end of going through columns array push new rowdata into queryRowData
        newQueryRowData.push(newObjForTableName);
      } else {
        //if table doesnt match just push table into query row data
        newQueryRowData.push(table);
      }
    }
    setQueryRowData(newQueryRowData);
  }

  //before darrens changes: < QueryGenerator queryTableData = { queryTableData } queryRowData = {queryRowData}/>
  return (
    <div className="main-body">
      <div className="body-left">
        <div className="inputURI">
          <input id="URI" type="text" placeholder="Your URI" />
          <button
            type="submit"
            onClick={() => getDatabase(document.getElementById('URI').value)}
          >
            <img src="../assets/click.png"></img>
          </button>
        </div>
        <div>
          <QueryGenerator queryRowData={queryRowData} />
        </div>
        <div className="database">{database}</div>
      </div>
      <div className="body-right">
        <Sidebar isValueOn={isValueOn} data={queryRowData}></Sidebar>
      </div>
    </div>
  );
}
