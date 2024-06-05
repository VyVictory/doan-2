import path from "path";
import express from "express";
import multer from "multer";
import fs from "fs"


const router = express.Router();

// Cấu hình multer storage cho ảnh sản phẩm
const productStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/product/");
  },
  filename: (req, file, cb) => {
    const extname = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${Date.now()}${extname}`);
  },
});

// Cấu hình multer storage cho ảnh đại diện
const avatarStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/avatar/");
  },
  filename: (req, file, cb) => {
    const extname = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${Date.now()}${extname}`);
  },
});

// Cấu hình file filter để chỉ chấp nhận ảnh
const fileFilter = (req, file, cb) => {
  const filetypes = /jpe?g|png|webp/;
  const mimetypes = /image\/jpe?g|image\/png|image\/webp/;

  const extname = path.extname(file.originalname).toLowerCase();
  const mimetype = file.mimetype;

  if (filetypes.test(extname) && mimetypes.test(mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("only image"), false);
  }
};

// Tạo multer instance cho ảnh sản phẩm
const uploadProductImage = multer({ storage: productStorage, fileFilter }).single("image");

// Tạo multer instance cho ảnh đại diện
const uploadAvatarImage = multer({ storage: avatarStorage, fileFilter }).single("image");

// Route để xử lý việc upload ảnh sản phẩm
router.post("/product", (req, res) => {
  uploadProductImage(req, res, async (err) => {
    if (err) {
      res.status(400).send({ message: err.message });
    } else if (req.file) {
      const imagePath = `/${req.file.path}`; // Đường dẫn mới của ảnh
      res.status(200).send({
        message: "Ảnh sản phẩm đã được tải lên thành công",
        image: imagePath,
      });
    } else {
      res.status(400).send({ message: "Không có file ảnh được cung cấp" });
    }
  });
});

// Route để xử lý việc upload ảnh đại diện
router.post("/avatar", (req, res) => {
  uploadAvatarImage(req, res, (err) => {
    if (err) {
      res.status(400).send({ message: err.message });
    } else if (req.file) {
      res.status(200).send({
        message: "Ảnh đại diện đã được tải lên thành công",
        image: `/${req.file.path}`,
      });
    } else {
      res.status(400).send({ message: "Không có file ảnh được cung cấp" });
    }
  });
});

export default router
