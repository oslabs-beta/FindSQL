const express = require("express");
const app = express();
const path = require("path");
const PORT = 3000;
const db = require("./query.js");
// this is to Q everything
// SELECT table_name
//   FROM information_schema.tables
//  WHERE table_schema='public'
//    AND table_type='BASE TABLE';

const queryString = `SELECT table_name
FROM information_schema.tables
WHERE table_schema='${"public"}'
AND table_type='${"BASE Table"}'`;

const query = `SELECT * FROM pg_catalog.pg_tables
WHERE schemaname != 'pg_catalog' AND
schemaname != 'information_schema';`;

// const testString = "SELECT * FROM planets limit 3";
app.get("/build", (req, res) => {
  return res.status(200).sendFile(path.join(__dirname, "../build/bundle.js"));
});

app.get("/", (req, res) => {
  return res.status(200).sendFile(path.join(__dirname, "../client/index.html"));
});

//get request to a test URL that will Query the tables needed to be pushed to front end
app.get(
  "/test",
  (req, res, next) => {
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
      //run a function that is declared below, to async pull all table names neatly into an array know as tableRows
      .then(() => {
        getTables();
      })
      //catch any error
      .catch((err) => {
        console.log(err);
      });
    next();
  },
  (req, res) => {
    res.status(200);
  }
);
//declaration of the tables array and the start of our async function to pull tables data
const tableRows = [];
async function getTables() {
  const tableData = [];
  console.log(tableRows);
  for (let i = 0; i < tableRows.length; i++) {
    const tableQuery = `SELECT * FROM ${tableRows[i]}`;
    const response = await db.query(tableQuery);
    tableData.push(response);
  }

  // tableData.forEach((entry) => {
  //   console.log(entry.rows[0]);
  // });

  const result = [];

  for (let i = 0; i < tableRows.length; i++) {
    if (tableData[i] !== undefined) {
      const returnVal = {};
      const keys = [];
      for (let key in tableData[i].rows[0]) keys.push(key);
      returnVal[tableRows[i]] = keys;
      result.push(returnVal);
    }
  }
  console.log(result);
}

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
