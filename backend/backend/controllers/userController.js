import User from "../models/userModel.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import bcrypt from "bcryptjs";
import createToken from "../utils/createToken.js";
import jwt from "jsonwebtoken";

const registerUser = asyncHandler(async (req, res) => {
  const { username, gender, fullname, password, phone, email, born,  } = req.body;

  // Kiểm tra xem tất cả các trường bắt buộc đã được điền chưa
  if (!username || !email || !password || !fullname) {
    res.status(400);
    throw new Error("Please fill all the inputs.");
  }

  // Kiểm tra xem email đã tồn tại chưa
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400).json({ message: "User with this email already exists." });
    return;
  }

  // Kiểm tra xem username đã tồn tại chưa
  const usernameExists = await User.findOne({ username });
  if (usernameExists) {
    res.status(400).json({ message: "User with this username already exists." });
    return;
  }

  // Mã hóa mật khẩu
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Tạo người dùng mới
  const newUser = new User({
    username,
    gender,
    fullname,
    email,
    password: hashedPassword,
    phone,
    born,
    
  });

  try {
    // Lưu người dùng vào cơ sở dữ liệu
    await newUser.save();

    // Tạo token và gửi kèm theo phản hồi
    createToken(res, newUser._id);

    // Trả về phản hồi thành công
    res.status(201).json({
      _id: newUser._id,
      username: newUser.username,
      fullname: newUser.fullname,
      email: newUser.email,
      isAdmin: newUser.isAdmin,
    });
  } catch (error) {
    res.status(400).json({ message: "Invalid user data" });
    console.error(error); // In lỗi ra console để dễ dàng debug
  }
});


const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  console.log(email);
  console.log(password);

  const existingUser = await User.findOne({ email });
  

  if (existingUser) {
    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!existingUser.isActive) {
      return res.status(401).json({ message: 'User is inactive. Please contact administrator.' });
    }

    if (isPasswordValid) {
     const token = createToken(res, existingUser._id);


      res.status(201).json({
        _id: existingUser._id,
        username: existingUser.username,
        email: existingUser.email,
        isAdmin: existingUser.isAdmin,
        token
      });
      return;
    }
  }
});


const getShop = asyncHandler(async  (req, res) => {
  const shop = await User.findById(req.params.id).select("-password");
  if (user) {
    res.json({
      nameShop: shop.nameShop,
      avatarShop: shop.avatarShop
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const updateShop = asyncHandler(async (req, res) => {
  const shop = await User.findById(req.params.id).select("-password");
  if (shop) {
    shop.nameShop = req.body.nameShop || shop.nameShop;
    shop.avatarShop = req.body.avatarShop || shop.avatarShop;

    const updatedShop = await shop.save();

    res.json({
      nameShop: updatedShop.nameShop,
      avatarShop: updatedShop.avatarShop
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});
//forgot password 
// client gửi email
//server kiểm tra email hợp lệ -> gửi mail + link(password change)



const logoutCurrentUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httyOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({ message: "Logged out successfully" });
});

const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

const getCurrentUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  console.log(user)

  if (user) {
    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      phone: user.phone,
      gender: user.gender,
      born: user.born,
      fullname: user.fullname,
      avatar: user.avatar,
      isAdmin: user.isAdmin,
      isActive: user.isActive,
      hidden: user.hidden,
    });
  } else {
    res.status(404);
    throw new Error("User not found.");
  }
});

const updateCurrentUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    // Cập nhật từng trường nếu chúng tồn tại trong yêu cầu
    if (req.body.username) {
      user.username = req.body.username;
    }
    if (req.body.email) {
      user.email = req.body.email;
    }
    if (req.body.phone) {
      user.phone = req.body.phone;
    }
    if (req.body.fullname) {
      user.fullname = req.body.fullname;
    }
    if (req.body.gender) {
      user.gender = req.body.gender;
    }
    if (req.body.born) {
      user.born = req.body.born;
    }
    if (req.body.avatar) {
      user.avatar = req.body.avatar;
    }
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(req.body.password, salt);
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
      phone: updatedUser.phone,
      fullname: updatedUser.fullname,
      gender: updatedUser.gender,
      isAdmin: updatedUser.isAdmin,
      born: updatedUser.born,
      avatar: updatedUser.avatar
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

const updateUserActiveStatus = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    // Update isActive status to the opposite of its current value
    user.isActive = !user.isActive;

    await user.save(); // Persist the change to the database

    res.json({ message: `User ${user.username} is now ${user.isActive ? 'active' : 'inactive'}`, email: user.email });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating user activity status' });
  }
});


const deleteUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    if (user.isAdmin) {
      res.status(400);
      throw new Error("Cannot delete admin user");
    }

    await User.deleteOne({ _id: user._id });
    res.json({ message: "User removed" });
  } else {
    res.status(404);
    throw new Error("User not found.");
  }
});

const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");

  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const updateUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;
    user.isAdmin = Boolean(req.body.isAdmin);

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const changePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const userId = req.user._id;

  try {
    // Tìm người dùng trong cơ sở dữ liệu
    const user = await User.findById(userId);

    // Kiểm tra xem mật khẩu hiện tại có đúng không
    const isPasswordMatched = await bcrypt.compare(currentPassword, user.password);
    if (!isPasswordMatched) {
      return res.status(400).json({ error: "Current password is incorrect" });
    }

    // Mã hóa mật khẩu mới
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Cập nhật mật khẩu mới cho người dùng
    user.password = hashedPassword;
    await user.save();

    res.json({ message: "Password updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export {
  registerUser,
  loginUser,
  updateUserActiveStatus,
  logoutCurrentUser,
  getAllUsers,
  getCurrentUserProfile,
  updateCurrentUserProfile,
  deleteUserById,
  getUserById,
  updateUserById,
  getShop,
  updateShop,
  changePassword,
};
