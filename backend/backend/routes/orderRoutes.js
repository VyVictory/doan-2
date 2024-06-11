import express from "express";
const router = express.Router();

import {
  createOrder,
  getAllOrdersSale,
  getUserOrders,
  countTotalOrders,
  calculateTotalSales,
  calcualteTotalSalesByDate,
  findOrderById,
  markOrderAsPaid,
  markOrderAsDelivered,
  updateOrderStatus,
  updateOrderShipping,
  cancelOrder,

} from "../controllers/orderController.js";

import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";

router
  .route("/")
  .post(authenticate, createOrder)
  .get(authenticate, getAllOrdersSale);

router.route("/mine").get(authenticate, getUserOrders);
router.route("/total-orders").get(countTotalOrders);
router.route("/total-sales").get(calculateTotalSales);
router.route("/total-sales-by-date").get(calcualteTotalSalesByDate);
router.route("/:id").get(authenticate, findOrderById);
router.route("/:id/pay").put(authenticate, markOrderAsPaid);
router.route("/updateStatus/:orderId").put(authenticate, updateOrderStatus);
router.route("/updateShip/:id").put(authenticate, updateOrderShipping);
router.route("/cancle/:id").put(authenticate, cancelOrder);
router
  .route("/:id/deliver")
  .put(authenticate, markOrderAsDelivered);


export default router;
