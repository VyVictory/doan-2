import express from "express";
import formidable from "express-formidable";
const router = express.Router();

// controllers
import {
  addProduct,
  updateProductDetails,
  removeProduct,
  fetchProducts,
  fetchProductById,
  fetchAllProducts,
  addProductReview,
  fetchTopProducts,
  fetchNewProducts,
  filterProducts,
  configApprove,
  getProductShopCurrent,
  getProductShopById,
  getProductByIdWithApproval,
  fakeDelete,
  restockProduct,

} from "../controllers/productController.js";
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";
import checkId from "../middlewares/checkId.js";

router
  .route("/")
  .get(fetchProducts)
  .post(authenticate, formidable(), addProduct);

router.route("/allproducts").get(fetchAllProducts);
router.route("/:id/reviews").post(authenticate, checkId, addProductReview);
router.put("/approve/:id", authenticate, authorizeAdmin, formidable(), configApprove);
router.patch("/countStock/:productid",authenticate,restockProduct);


router.route("/shop").get(authenticate,getProductShopCurrent);
router.get('/shop/:id', getProductShopById);

router.get('/approve/:id', authenticate, authorizeAdmin, getProductByIdWithApproval);

router.get("/top", fetchTopProducts);
router.get("/new", fetchNewProducts);

router.route("fakedelete",authenticate,fakeDelete);

router
  .route("/:id")
  .get(fetchProductById)
  .put(authenticate, authorizeAdmin, formidable(), updateProductDetails)
  .delete(authenticate, authorizeAdmin, removeProduct);

router.route("/filtered-products").post(filterProducts);

export default router;
