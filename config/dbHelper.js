const db = require("./db");

function query(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.query(sql, params, (err, results) => {
      if (err) {
        console.error("❌ SQL Error:", err.sqlMessage || err);
        return reject(err); // 👈 nhớ return ở đây
      }
      resolve(results);
    });
  });
}

module.exports = query;
