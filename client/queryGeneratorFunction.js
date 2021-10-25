export default function queryGeneratorFunction (queryRowData) {
  // Initialize an empty string, result, to serve as a baseplate for all query strings generated
  let result = '';
  // Initialize an empty string, table, to serve as a baseplate for any table being queried and concatted to the query string
  let table = '';
  // Initialize counter variables to keep track of when to concat certain SQL commands into the string (ie. SELECT, FROM, WHERE, AND, etc.)
  let countTable = 0; 
  let countRow = 0;
  let countDuplicate = 0;
  let countWhere = 0;

  // For querying all columns in a table, check for any isSelected properties equal to true
  if(queryRowData.some(obj => obj['isSelected'])){
    // Initialize the first part of the query string by concatenating 'SELECT '
    result += 'SELECT ';
    // Initialize a counter variable to keep track of the number of isSelected properties that are toggled to true
    let isSelectedCounter = 0;
    // Initialize an empty array to keep track of tableNames with isSelected = true
    const selectedTableNames = [];
    // Initialize an empty array to keep track of columnNames toggled true
    const selectedColumnNames = [];
    
    // Find all tableNames and columnNames with a truthy isSelected property, increment counter,
    // and fill their respective arrays (selectedTableNames, selectedColumnNames)
    for (let i = 0; i < queryRowData.length; i++) {
      if (queryRowData[i].isSelected) {
        isSelectedCounter++;
        const tableName = Object.keys(queryRowData[i])[0];
        selectedTableNames.push(tableName);

        for (let j = 0; j < queryRowData[i][tableName].length; j++) {
          const columnName = Object.keys(queryRowData[i][tableName][j]);
          if (queryRowData[i][tableName][j][columnName]) {
            selectedColumnNames.push(columnName[0]);
          }
        }
      }
    }

    // If more than one table has been selected (isSelectedCounter > 1),
    // the user is either querying all columns from multiple tables
    // OR querying a full outer join query
    
    // FULL OUTER JOIN: 
    // If two tables have been selected AND columns from each table with the same name have been selected
    //    Find all duplicates in selectedColumnNames because those are the values that have been selected to be joined together

    if (selectedTableNames.length === 2 && selectedColumnNames.length % 2 === 0 && selectedColumnNames.length !== 0){
    
      let firstPart = `SELECT ${selectedTableNames[0]}.*, ${selectedTableNames[1]}.* FROM ${selectedTableNames[0]} FULL OUTER JOIN ${selectedTableNames[1]}`;
      const duplicates = returnDuplicates(selectedColumnNames);

      for(let i = 0; i < duplicates.length; i++){
        if(countDuplicate === 0){
          firstPart += ` ON ${selectedTableNames[0]}.${duplicates[i]} = ${selectedTableNames[1]}.${duplicates[i]}`;
        }else{
          firstPart += ` AND ${selectedTableNames[0]}.${duplicates[i]} = ${selectedTableNames[1]}.${duplicates[i]}`;
        }
        countDuplicate++;
      }
      return firstPart;
    }

    // QUERYING ALL COLUMNS FROM MULTIPLE TABLES:
    //    Otherwise, we know the user is querying every column from multiple tables
    for (let i = 0; i < queryRowData.length; i++) {
      const key = Object.keys(queryRowData[i])[0];
      if (queryRowData[i]['isSelected']) {
        if (countTable === 0){
          result += `* FROM "${key}"`;
        } else {
          result += `, "${key}"`;
        } 
        countTable++;
      }
    }
    return result;
  }else {
    // WHERE CLAUSE:
    // If the user has selected a column value, we know they want to use a WHERE clause
    //    Find all truthy column values because those are the values that have been selected to be queried
    
    // Initialize two empty arrays and an empty string to keep track of the selected column value,
    // the column name, and table name associated with it
    const selectedWhere = [];
    const selectedColName = [];
    let whereTableName = '';

    for(let i = 0; i < queryRowData.length; i++){
      const colArr = queryRowData[i]['column_rows'];
      const colTableName = Object.keys(queryRowData[i])[0];

      colArr.forEach(colObj => {
        const colName = Object.keys(colObj)[0];
        const colVal = Object.keys(colObj[colName])[0];
        if (colObj[colName][colVal] === true) {
          selectedWhere.push([colName, colVal]);
          // filter colName so its only one string per click
          // console.log('colName: ' + colName);
          // selectedColName.push(colName);
          whereTableName = colTableName;
        }
      });
    }

    // For WHERE clauses, the query string only needs the column name/value written once
    // so remove all duplicates from both arrays to keep the column name/value from being repeated in the query string
    // const filteredWhere = removeDuplicates(selectedWhere);
    // const filteredColName = removeDuplicates(selectedColName);
    selectedWhere.sort();
    // console.log('selectedWhere: ' + selectedWhere);
    if(selectedWhere.length > 0){
      let whereClause = 'WHERE ';
      
      for(let i = 0; i < selectedWhere.length; i++){
        if(countWhere === 0){
          result += 'SELECT * ';
          whereClause += `${selectedWhere[i][0]} = '${selectedWhere[i][1]}' `;
          countWhere++;
        }else{
          
          if (whereClause.includes(` ${selectedWhere[i][0]} = '${selectedWhere[i][1]}' `)) {
            continue;
          } else if (selectedWhere[i-1][0] === selectedWhere[i][0]){
            whereClause += `OR ${selectedWhere[i][0]} = '${selectedWhere[i][1]}' `;
            countWhere++;
          } else {
            whereClause += `AND ${selectedWhere[i][0]} = '${selectedWhere[i][1]}' `;
            countWhere++;
          }
        }
      }
      return result + `FROM ${whereTableName} ` + whereClause;
    }

    // SELECT { columnName } FROM { tableName }
    // If the user hasnt selected any column values from the sideTable, 
    // they are querying all data from the selected columns of that table
    for (let i = 0; i < queryRowData.length; i++) {
      const key = Object.keys(queryRowData[i])[0];

      queryRowData[i][key].forEach(rowObj => {
        const rowKey = Object.keys(rowObj)[0]; 
        if(rowObj[rowKey] === true){
          if(table !== key) {
            countRow = 0;
            result = '';
          }
          table = key;
          if(countRow === 0){
            result += `SELECT ${rowKey}`;
          }else{
            result += `, ${rowKey}`;
          }
          countRow++;
        }
      });
    }
    if(result === '') return result;

    else return result += ` FROM ${table}`;
  } 
}

// Define the helper functions to remove/display duplicates in the arrays that we create
function returnDuplicates(arr){
  const duplicates = [];
  for(let i = 0; i < arr.length; i++){
    const ele = arr[i];
    for(let j = 0; j < arr.length; j++){
      if(ele === arr[j] && i !== j){
        if(!duplicates.includes(ele)) duplicates.push(ele);
        else continue;
      }
    }
  }
  return duplicates;
}

function removeDuplicates(arr){
  const filtered = [];
  arr.forEach(el => {
    if(!filtered.includes(el)) filtered.push(el);
  });
  return filtered;
}