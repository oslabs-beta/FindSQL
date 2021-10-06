const db = require("./query.js");

const queryString = `SELECT table_name
FROM information_schema.tables
WHERE table_schema='${"public"}'
AND table_type='${"BASE Table"}'`;

const query = `SELECT * FROM pg_catalog.pg_tables
WHERE schemaname != 'pg_catalog' AND
schemaname != 'information_schema';`;

// const testString = "SELECT * FROM planets limit 3";
const queryController = {};

queryController.getQuery = (req, res, next) => {
  try {
    // initiate the query
    db.query(query)
      .then((data) => {
        return data.rows;
      })
      .then((rows) => {
        rows.forEach((row) => {
          tableRows.push(row.tablename);
        });
      })
      .then(() => {
        next();
      });
  } catch (err) {
    return next({
      log: `err inside getQ Err = ${err}`,
    });
  }
};

const tableRows = [];
let finalResult = [];

queryController.getAllTables = async (req, res, next) => {
  try {
    const result = [];
    const tableData = [];
    for (let i = 0; i < tableRows.length; i++) {
      const tableQuery = `SELECT * FROM ${tableRows[i]}`;
      const response = await db.query(tableQuery);
      tableData.push(response);
    }
    for (let i = 0; i < tableRows.length; i++) {
      if (tableData[i] !== undefined) {
        const returnVal = {};
        const keys = [];
        for (let key in tableData[i].rows[0]) keys.push(key);
        returnVal[tableRows[i]] = keys;
        result.push(returnVal);
      }
    }
    // console.log(result);
    finalResult = [...result];
    res.locals.data = finalResult;
    next();
  } catch (err) {
    return next({
      log: `err inside getAllT Err = ${err}`,
    });
  }
};

// queryController.setResponseData = (req, res, next) => {
//   console.log(res.locals.data, "anthony is here");
// };

module.exports = queryController;
