export default function queryGeneratorFunction (queryData) {

  // find the objectkey that has a true value
  for (let i = 0 ; i < queryData.lenght; i++) {
    if (queryData[i]) {
      return `SELECT * FROM ${ queryData[i] }`
    }
  }
};