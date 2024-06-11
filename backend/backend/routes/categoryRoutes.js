import express from "express";
const router = express.Router();
import {
  createCategory,
  updateCategory,
  removeCategory,
  listCategory,
  readCategory,

} from "../controllers/categoryController.js";

import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";

router.route("/").post(authenticate , createCategory);
router.route("/:categoryId").put(authenticate, updateCategory);


router
  .route("/:categoryId")
  .delete(authenticate, removeCategory);

router.route("/categories").get(listCategory);
router.route("/:id").get(readCategory);


export default router;
