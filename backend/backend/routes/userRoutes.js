import express from "express";
import {
  
  registerUser,
  loginUser,
  logoutCurrentUser,
  getAllUsers,
  getCurrentUserProfile,
  updateCurrentUserProfile,
  deleteUserById,
  getUserById,
  updateUserById,
  updateUserActiveStatus,
  getShop,
  updateShop,
  changePassword,
  forgotPassword,
  getUserAddresses,
  addUserAddress,
  
} from "../controllers/userController.js";

import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

router
  .route("/")
  .post(registerUser)
  .get(authenticate, authorizeAdmin, getAllUsers);

router.post("/auth", loginUser);
router.post("/logout", logoutCurrentUser);
router.post("/auth/changepassword", authenticate, changePassword);
router.get("/auth/forgotpassword", forgotPassword);
router.get("/shop", authenticate ,getShop);
router.put("/shop", authenticate,updateShop);

router 
.route("/address")
  .post(authenticate,addUserAddress)
  .get(authenticate,getUserAddresses)


router
  .route("/profile")
  .get(authenticate, getCurrentUserProfile)
  .put(authenticate, updateCurrentUserProfile);

// ADMIN ROUTES 👇
router
  .route("/:id")
  .delete(authenticate, authorizeAdmin, deleteUserById)
  .get(authenticate, authorizeAdmin, getUserById)
  .put(authenticate, authorizeAdmin, updateUserById)
  .patch(authenticate, authorizeAdmin, updateUserActiveStatus);

export default router;
