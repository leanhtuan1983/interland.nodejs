const query = require("../config/dbHelper");
const slugify = require("slugify");

// Render trang index categories
exports.index = async (req, res) => {
  try {
    // Lấy danh sách categories để hiển thị trong dropdown
    const categories = await query(
      "SELECT id, name FROM categories WHERE parent_id = 0 OR parent_id IS NULL"
    );
    res.render("categories/index", {
      title: "Categories",
      categories: categories,
    });
  } catch (err) {
    console.error(err);
    res.render("categories/index", {
      title: "Categories",
      categories: [],
    });
  }
};

// Fetch database
exports.fetchCategoryList = async (req, res) => {
  try {
    // Lấy thêm thông tin người tạo và tên danh mục cha
    const results = await query(`
      SELECT c.*, u.username as created_by_name, p.name as parent_name 
      FROM categories c 
      LEFT JOIN users u ON c.user_id = u.id 
      LEFT JOIN categories p ON c.parent_id = p.id
      ORDER BY c.created_at DESC
    `);
    res.json({ success: true, data: results });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Lỗi tải dữ liệu" });
  }
};

// Create category
exports.add = async (req, res) => {
  try {
    console.log("===== DEBUG CATEGORY ADD =====");
    console.log("Session user:", req.session.user);
    console.log("Body:", req.body);
    console.log("File:", req.file);

    if (!req.session.user || !req.session.user.id) {
      return res
        .status(401)
        .json({ success: false, message: "Bạn chưa đăng nhập hợp lệ" });
    }

    const { name, parent_id, status } = req.body;

    if (!name || name.trim() === "") {
      return res.json({ success: false, message: "Tên category không hợp lệ" });
    }

    let validParentId = 0;
    if (parent_id && parent_id !== "0") {
      const parentExists = await query(
        "SELECT id FROM categories WHERE id = ?",
        [parent_id]
      );
      if (parentExists.length > 0) {
        validParentId = parent_id;
      }
    }

    const slug = slugify(name, { lower: true, strict: true, locale: "vi" });
    const avatar = req.file ? "/uploads/" + req.file.filename : null;
    const user_id = req.session.user.id;

    console.log("Insert data:", {
      name: name.trim(),
      slug,
      parent_id: validParentId,
      status,
      avatar,
      user_id,
    });

    await query(
      "INSERT INTO categories (name, slug, parent_id, status, avatar, user_id) VALUES (?, ?, ?, ?, ?, ?)",
      [name.trim(), slug, validParentId, status, avatar, user_id]
    );

    return res.json({ success: true, message: "Thêm mới category thành công" });
  } catch (err) {
    console.error("❌ Server error:", err);
    return res.status(500).json({ success: false, message: err.message });
  }
};
