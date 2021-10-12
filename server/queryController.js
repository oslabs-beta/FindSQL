const createDB = require('./query.js');
const { Pool } = require('pg');

const query = `SELECT * FROM pg_catalog.pg_tables
WHERE schemaname != 'pg_catalog' AND
schemaname != 'information_schema';`;


// declare query object that will later be exported
const queryController = {};
// declare query rows, that will later be filled with data, and then reset at the end of the get request
let tableRows = [];
queryController.databaseCreator = (req, res, next)=> {
  const { uri } = req.body;
  const db = createDB(uri);
  res.locals.db = db; 
  next(); 
};
// query controller to get query
queryController.getQuery = (req, res, next) => {
  const { db } = res.locals;

  try {
    // initiate the query
    db.query(query)
      .then((data) => {
        return data.rows;
      })
      // iterate through queries array of objects, grabbing strictly the table names of the query
      .then((rows) => {
        rows.forEach((row) => {
          tableRows.push(row.tablename);
        });
        // continue on with middleware
        next();
      });
    // error catcher
  } catch (err) {
    return next({
      err: `err inside getQ Err = ${err}`,
    });
  }
};
// take the data from table rows declared earlier and play with it
queryController.getAllTables = async (req, res, next) => {
  const { db } = res.locals;
  try {
    // declare variables for the final result, and the table data
    const result = [];
    const tableData = [];
    console.log(tableRows);
    // for loop to iterate through tableRows variable
    for (let i = 0; i < tableRows.length; i++) {
      // declare query string for each tableRow's name
      const tableQuery = `SELECT * FROM ${tableRows[i]}`;
      // query database for all data in specified table
      const response = await db.query(tableQuery);
      // push the data to tableData array
      tableData.push(response);
    }
    //create for loop to iterate through tableRows variable
    for (let i = 0; i < tableRows.length; i++) {
      // if the current indice is defined
      if (tableData[i] !== undefined) {
        // declare variable for returned values and keys
        const returnVal = {};
        const keys = [];
        // iterate through object pushing keys into key array
        for (const key in tableData[i].rows[0]) {
          keys.push(key);
        }
        // push tableRows current indice and the associated key array into returned object (returnVal)
        returnVal[tableRows[i]] = keys;
        // push returnVal object into final return (result) array
        result.push(returnVal);
      }
    }
    //resets table rows
    tableRows = [];
    // console.log(result);
    res.locals.data = result;
    next();
    // catch errors for getAllTables
  } catch (err) {
    return next({
      err: `err inside getAllT Err = ${err}`,
    });
  }
};

// queryController.setResponseData = (req, res, next) => {
//   console.log(res.locals.data, "anthony is here");
// };

module.exports = queryController;
