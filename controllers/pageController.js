const db = require("../config/db");

exports.home = (req, res) => {
  res.render("pages/home", { title: "Trang chủ" });
};
