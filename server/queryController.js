const createDB = require("./query.js");
const { Pool } = require("pg");
const { constants } = require("buffer");
const queries = require("./queryString.js");
const query = `SELECT * FROM pg_catalog.pg_tables
WHERE schemaname != 'pg_catalog' AND
schemaname != 'information_schema';`;

const getForeignKeys = `
select kcu.table_name as foreign_table,
  rel_kcu.table_name as primary_table,
  kcu.column_name as fk_column
from information_schema.table_constraints tco
join information_schema.key_column_usage kcu 
  on tco.constraint_name = kcu.constraint_name
join information_schema.referential_constraints rco 
  on tco.constraint_name = rco.constraint_name
join information_schema.key_column_usage rel_kcu 
  on rco.unique_constraint_name = rel_kcu.constraint_name
where tco.constraint_type = 'FOREIGN KEY'
order by kcu.table_schema,
  kcu.table_name,
  kcu.ordinal_position;`;

// declare query object that will later be exported
const queryController = {};
// declare query rows, that will later be filled with data, and then reset at the end of the get request
let tableRows = [];
queryController.databaseCreator = (req, res, next) => {
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
    db.query(queries.mainDB)
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
  // console.log(private.fields);
  try {
    // declare variables for the final result, and the table data
    const result = [];
    const tableData = [];
    // console.log(tableRows);
    // for loop to iterate through tableRows variable
    for (let i = 0; i < tableRows.length; i++) {
      // declare query string for each tableRow's name
      const tableQuery = `SELECT * FROM ${tableRows[i]}`;
      // query database for all data in specified table
      // console.log(tableQuery);
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

queryController.getKeys = async (req, res, next) => {
  const { db, data } = res.locals;
  try {
    //get table foreign key data
    const foreign = await db.query(queries.foreignKeyQuery);
    //iterate through data obj from get all tables
    const newData = [];
    for (let table of data) {
      const tableName = Object.keys(table)[0];
      for (let keyVals of foreign.rows) {
        if (keyVals.primary_table === tableName) {
          const tableKeyObj = {};
          tableKeyObj.foreign_table = keyVals.foreign_table;
          tableKeyObj.foreign_column = keyVals.fk_column;
          table = Object.assign(table, tableKeyObj);
        }
      }
    }
    next();
  } catch (err) {
    return next({
      err: `err inside getKeys Err = ${err}`,
    });
  }
};
// queryController.setResponseData = (req, res, next) => {
//   console.log(res.locals.data, "anthony is here");
// };

module.exports = queryController;
