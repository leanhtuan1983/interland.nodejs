const query = require("../config/dbHelper");

// Render trang index categories
exports.index = (req, res) => {
  res.render("categories/index", { title: "Categories" });
};

// Fetch database
exports.fetchCategoryList = async (req, res) => {
  try {
    const results = await query("SELECT * FROM categories");
    res.json({ success: true, data: results });
  } catch (err) {
    res.status(500).json({ success: false, message: "Lỗi tải dữ liệu" });
  }
};
