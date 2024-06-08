import express from "express";
const router = express.Router();

import {
  addToCart,
  removeFromCart,
  updateCart,
  getUserCart,
  checkoutCart,
  getCartIdByProductId, 

} from "../controllers/cartController.js";

import { authenticate } from "../middlewares/authMiddleware.js";

// Thêm sản phẩm vào giỏ hàng
router.post("/add", authenticate, addToCart);

// Xóa sản phẩm khỏi giỏ hàng
router.delete("/delete/:id", authenticate, removeFromCart);

// Cập nhật số lượng sản phẩm trong giỏ hàng
router.put("/update", authenticate, updateCart);

// Lấy giỏ hàng của người dùng
router.get("/get", authenticate, getUserCart);

router.post("/checkout", authenticate, checkoutCart);

router.get('/product/:productId', authenticate, getCartIdByProductId);

export default router;
