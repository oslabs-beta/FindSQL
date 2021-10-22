export default function queryGeneratorFunction (queryRowData) {
  
  let result = '';
 
  // const fullTableSelected = false; 
  //iterate through queryRowData array to see if any values are true
  //if any of query row elements are true we need to store data
  
  //[{species : false}]
  let countTable = 0; 
  let countRow = 0;
  let countDuplicate = 0;
  // ***** 
  let countWhere = 0;
  let table = '';
  
  // find the objectkey that has a true value

  //(10/16/2021) first, we want to check if any isSelected property is equal to true because we'll know that the user is trying to query everything in a table
  if(queryRowData.some(obj => obj['isSelected'])){
    result += 'SELECT ';
    //set up the logic to handle scenarios where there is more than one isSelected toggled to true: 
    //Full Outer Join
    //initialize a counter variable to keep track of the number of isSelected properties that are toggled to true
    let isSelectedCounter = 0;
    //initialize an empty array to keep track of tableNames with isSelected = true
    const selectedTableNames = [];
    //initialize an empty array to keep track of columnNames toggled true
    const selectedColumnNames = [];
    // ***** intialize an empty array to keep track of column values that were selected for the WHERE query
    
    //loop through queryRowData, if the obj['isSelected] === true, increment the counter.
    //if true, fill the tableName array with the tablename
    // ***** this for loop will handle finding all the values that are toggled: true, and this is where we'll likely grab the values for selectedWhere array
    for (let i = 0; i < queryRowData.length; i++) {
      
      if (queryRowData[i].isSelected) {
        isSelectedCounter++;
        const tableName = Object.keys(queryRowData[i])[0];
        selectedTableNames.push(tableName);

        //loop through the columns of the tables in the array, if the column is toggled true, push the column name in to the columnNames array
        for (let j = 0; j < queryRowData[i][tableName].length; j++) {
          const columnName = Object.keys(queryRowData[i][tableName][j]);
          if (queryRowData[i][tableName][j][columnName]) {
            
            selectedColumnNames.push(columnName[0]);
          }
        }
      }
    }

    //if the isSelected counter is greater than 1, go into another block of logic
    //for the simple outer join logic: check if selected ColumnNames array is length 2 AND the elements are equal
      //this is where we build out the query string
    
    if (selectedTableNames.length === 2 && selectedColumnNames.length % 2 === 0 && selectedColumnNames.length !== 0){
      // SELECT ${tableName1}.*, ${tableName2}.* FROM ${tableName1} FULL OUTER JOIN ${tableName2} ON ${tableName1}.${columnName} = ${tableName2}.${columnName}
      // return `SELECT ${selectedTableNames[0]}.*, ${selectedTableNames[1]}.* FROM ${selectedTableNames[0]} FULL OUTER JOIN ${selectedTableNames[1]} ON ${selectedTableNames[0]}.${selectedColumnNames[0]} = ${selectedTableNames[1]}.${selectedColumnNames[0]}`;
      let firstPart = `SELECT ${selectedTableNames[0]}.*, ${selectedTableNames[1]}.* FROM ${selectedTableNames[0]} FULL OUTER JOIN ${selectedTableNames[1]}`;
      // find and identify duplicates from selectedColumnNames
      const duplicates = returnDuplicates(selectedColumnNames);
      // concat them to firstPart string 
      for(let i = 0; i < duplicates.length; i++){
        // 1st duplicate : ` ON ${selectedTableNames[0]}.${duplicate} = ${selectedTableNames[1]}.${duplicate}`
        if(countDuplicate === 0){
          firstPart += ` ON ${selectedTableNames[0]}.${duplicates[i]} = ${selectedTableNames[1]}.${duplicates[i]}`;
        }else{
          // any other duplicate : ` AND ${selectedTableNames[0]}.${duplicate} = ${selectedTableNames[1]}.${duplicate}`
          firstPart += ` AND ${selectedTableNames[0]}.${duplicates[i]} = ${selectedTableNames[1]}.${duplicates[i]}`;
        }
        countDuplicate++;
      }
      return firstPart;
    }

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
    //****for handling the WHERE clause */
    //initiate a for loop where we access specifically the "column_rows" key, and search for any column values that were toggled and push into an array 
    const selectedWhere = [];
    const selectedColName = [];
    let whereTableName = '';
    for(let i = 0; i < queryRowData.length; i++){
      // every element in this array, is an object with a single key (represents a column name) {name: { Luke Skywalker: true }}
      const colArr = queryRowData[i]['column_rows'];
      const colTableName = Object.keys(queryRowData[i])[0];
      colArr.forEach(colObj => {
        let colName = Object.keys(colObj)[0];
        const colVal = Object.keys(colObj[colName])[0];
        if (colObj[colName][colVal] === true) {
          selectedWhere.push(colVal);
          selectedColName.push(colName);
          whereTableName = colTableName;
        }
      });
    }
    const filteredWhere = removeDuplicates(selectedWhere);
    const filteredColName = removeDuplicates(selectedColName);
    
    if(filteredWhere.length > 0){
      let whereClause = `WHERE `;
      for(let i = 0; i < filteredWhere.length; i++){
        // SELECT column FROM table WHERE colName = colVal AND colName = colVal
        if(countWhere === 0){
          // result += `SELECT ${filteredColName[i]} `; // better to use * instead of 
          result += `SELECT * `;
          whereClause += `${filteredColName[i]} = '${filteredWhere[i]}' `;
          countWhere++;
        }else{
          // result += `, ${selectedColName[i]} `;
          whereClause += `AND ${filteredColName[i]} = '${filteredWhere[i]}' `;
          countWhere++;
        }
      }
      return result + `FROM ${whereTableName} ` + whereClause;
    }
    //if not, then we know that theyre executing something more complex and this block of code will contain different sets of logic to handle the different scenarios
    for (let i = 0; i < queryRowData.length; i++) {
      const key = Object.keys(queryRowData[i])[0]; // tablename

      queryRowData[i][key].forEach(rowObj => {
        // if true, concatenate the 'row name' to result

        const rowKey = Object.keys(rowObj)[0]; // rowname
        // if tablename changes, 
        // if key !== table && table !== '', reset result && countRow
        
        // table = key;
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
  
  // return result === 'SELECT ' ?  '' : result;
}


function returnDuplicates(arr){
  const duplicates = [];
  for(let i = 0; i < arr.length; i++){
    let ele = arr[i];
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