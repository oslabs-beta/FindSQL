const { Pool } = require('pg');


function createDB(uri) {
  const URI = uri;
  const pool = new Pool({
    connectionString: URI,
  });
  return {
    query: (text, params, callback) => {
      console.log('executed query', text);
      return pool.query(text, params, callback);
    }
  };
}
module.exports = createDB;
