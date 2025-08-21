const express = require("express");
const router = express.Router();
const multer = require("multer");
const categoryController = require("../controllers/categoryController");
const isLoggedIn = require("../middlewares/authentication");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads/"); // thư mục lưu ảnh
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

// Thêm các giới hạn cho Multer
const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 }, // Ví dụ: giới hạn 5MB
});

router.get("/", isLoggedIn, categoryController.index);
router.get(
  "/fetchCategoryList",
  isLoggedIn,
  categoryController.fetchCategoryList
);

// Thêm middleware xử lý lỗi cho Multer
const uploadHandler = (req, res, next) => {
  upload.single("avatar")(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      // Lỗi của Multer (ví dụ: file quá lớn)
      return res
        .status(400)
        .json({ success: false, message: `Lỗi tải file: ${err.message}` });
    } else if (err) {
      // Các lỗi khác
      return res
        .status(500)
        .json({ success: false, message: "Lỗi không xác định khi tải file" });
    }
    next(); // Tiếp tục sang controller nếu không có lỗi
  });
};

router.post(
  "/add",
  isLoggedIn,
  uploadHandler, // Sử dụng middleware xử lý lỗi
  categoryController.add
);

module.exports = router;
