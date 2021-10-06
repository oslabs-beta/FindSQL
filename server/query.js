const { Pool } = require("pg");
const URI =
  "postgres://hdyovvhb:AdLaNCcnn6hQ939_Hq1ba44_qTfnEdUN@chunee.db.elephantsql.com/hdyovvhb";
///postgres://hdyovvhb:AdLaNCcnn6hQ939_Hq1ba44_qTfnEdUN@chunee.db.elephantsql.com/hdyovvhb
//postgres://wtgafyxz:1No3Fkm1eP_hGAVCnLPv60CXkqW0mLOi@kashin.db.elephantsql.com/wtgafyxz
const pool = new Pool({
  connectionString: URI,
});

module.exports = {
  voice: "i'm here in the code",
  query: (text, params, callback) => {
    console.log("executed query", text);
    return pool.query(text, params, callback);
  },
};

// SELECT table_name
//   FROM information_schema.tables
//  WHERE table_schema='public'
//    AND table_type='BASE TABLE';
