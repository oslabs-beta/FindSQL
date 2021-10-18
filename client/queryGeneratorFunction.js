export default function queryGeneratorFunction (queryRowData) {
  // console.log('queryRowData from func: ' + queryRowData); // array of objects

  let result = 'SELECT ';
 
  const fullTableSelected = false; 
  //iterate through queryRowData array to see if any values are true
  //if any of query row elements are true we need to store data
  // console.log('queryRowData: ' + queryRowData);
  //[{species : false}]
  let count = 0; 
  // find the objectkey that has a true value
  for (let i = 0; i < queryRowData.length; i++) {
    // console.log('queryRowData objects: ', queryRowData[i]);
    // {species: [{"_id" : false}, {"name" : false}] }
    const key = Object.keys(queryRowData[i])[0]; // [tableName]
    // console.log('this is key: ', key);
    console.log(queryRowData[i][key]);
    // check if isSelected is true, then send all
    //the first thing we want to check after grabbing the tableName, is to see if its 'isSelected' is true or false, 
      //if true, we want to concatenate the tablename to  'SELECT * FROM' and at the end of the the loop, return the query string
      //otherwise, continue with the rest of the logic

    if (queryRowData[i]['isSelected']) {
      if (count === 0){
        result += `* FROM "${key}"`;
      } else {
        result += `, "${key}"`;
      }
      count++;
    }

  }
  return result === 'SELECT ' ?  '' : result;
}

