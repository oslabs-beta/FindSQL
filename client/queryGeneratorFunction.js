export default function queryGeneratorFunction (queryData) {
  let result = 'SELECT * ';
  let count = 0; 
  // find the objectkey that has a true value
  for (let i = 0 ; i < queryData.length; i++) {
    // {"people" : false}
    const key = Object.keys(queryData[i]);
    // const keys = Object.keys(queryData[i]);
    if (queryData[i][key]) {
      if (count === 0){
        result += `FROM "${key}"`;
      } else {
        result += `, "${key}"`;
      }
      count++;
    }
  }
  return result; 
}