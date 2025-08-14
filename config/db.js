const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "node10_interland",
});

connection.connect((err) => {
  if (err) {
    console.error("Kết nối database thất bại:", err);
    return;
  }
  console.log("Kết nối MySQL thành công");
});

module.exports = connection;
