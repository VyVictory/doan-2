import User from "../models/userModel.js";
import Address from "../models/addressModel.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import bcrypt from "bcryptjs";
import createToken from "../utils/createToken.js";
import sendMail from "../utils/sendMail.js";
import crypto from 'crypto';




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
    const { isActive } = req.body;
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    user.isActive = isActive;

    await user.save(); 

    res.json({ message: `User ${user.username} is now ${user.isActive ? 'active' : 'inactive'}`, email: user.email });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating user activity status' });
  }
});

const getUserActiveStatus = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    // Trả về trạng thái hoạt động của người dùng
    res.json({ isActive: user.isActive });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error getting user activity status' });
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

const addUserAddress = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { countries, city, street, apartment } = req.body;

  const user = await User.findById(userId);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  const address = new Address({
    countries,
    city,
    street,
    apartment,
    user: userId,
  });

  const createdAddress = await address.save();

  // Push the newly created address to the user's addresses array
  user.addresses.push(createdAddress);
  await user.save();

  res.status(201).json(createdAddress);
});

const updateUserAddress = asyncHandler(async (req, res) => {
  const userId = req.user._id; // ID của người dùng
  const addressId = req.params.id; // ID của địa chỉ cần cập nhật
  const { countries, city, street, apartment } = req.body; // Thông tin mới của địa chỉ

  try {
    const user = await User.findById(userId);
    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }

    // Cập nhật thông tin của địa chỉ
    const updatedAddress = await Address.findByIdAndUpdate(addressId, {
      countries,
      city,
      street,
      apartment
    }, { new: true }); // { new: true } để trả về đối tượng đã được cập nhật

    if (!updatedAddress) {
      res.status(404);
      throw new Error("Address not found");
    }

    res.json({ message: "Address updated successfully", updatedAddress });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// <<<<<<< HEAD
// const deleteUserAddress = asyncHandler(async (req, res) => {
//   const { addressId } = req.params;
  
//   const user = await User.findById(req.user._id);
// =======

const deleteUserAddress = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const addressId = req.params.id; 

  const user = await User.findById(userId);
// >>>>>>> 6707ef6e0a11c7624fd0208f12775ac8f6d1d603
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }
  const addressIndex = user.addresses.findIndex(addr => addr._id.toString() === addressId);

  if (addressIndex === -1) {
    res.status(404);
    throw new Error("Address not found");
  }
  user.addresses.splice(addressIndex, 1);
  await user.save();

  await Address.findByIdAndDelete(addressId);

  res.json({ message: "Address deleted successfully" });
});


const getUserAddresses = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const user = await User.findById(userId).populate("addresses");
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }
  res.json(user.addresses);
});

const changePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const userId = req.user._id;

  try {
    const user = await User.findById(userId);
    const isPasswordMatched = await bcrypt.compare(currentPassword, user.password);
    if (!isPasswordMatched) {
      return res.status(400).json({ error: "Current password is incorrect" });
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();
    res.json({ message: "Password updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



//client gửi email
//server kiểm tra email tồn tại -> gửi mail + token đổi pass
//client check mail + bấm vào link
//client gửi api kèm token
//server check token có giống với token đã cung cấp không
//đổi mật khẩu

const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.query; 

  if (!email) {
      res.status(400).json({ message: 'Missing email' });
      return;
  }

  const user = await User.findOne({ email });
  if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
  }

  const resetToken = user.createPasswordChangedToken();
  
  await user.save();

  const html = `click vào link dưới dưới đây để đổi mật khẩu link này có thời gian tồn tại 15 phút. <a href="${process.env.URL_SERVER}?token=${resetToken}">CLICK HERE</a>`;

  const mailData = {
      email,
      html 
  };
  
  // Gửi email
  const mailResponse = await sendMail(mailData);

  console.log(`Forgot password email sent to: ${email}`); 
  res.status(200).json({
      success: true,
      mailResponse
  });
});


const resetPassword = asyncHandler(async (req, res) => {
  const { password } = req.body;
  const token = req.query.token; 

  if (!token) {
    return res.status(400).json({ message: 'Missing token' });
  }

  const passwordResetToken = crypto.createHash('sha256').update(token).digest('hex');
  const user = await User.findOne({ passwordResetToken, passwordRestExpires: { $gt: Date.now() } });

  if (!user) {
    return res.status(404).json({ message: 'Invalid reset token' });
  }

  user.password = password;
  user.passwordResetToken = undefined;
  user.passwordChangeAt = Date.now();
  user.passwordRestExpires = undefined;

  await user.save();

  return res.status(200).json({
    success: true,
    mes: 'Update password'
  });
});


export {
  registerUser,
  addUserAddress,
  getUserAddresses,
  loginUser,
  updateUserActiveStatus,
  getUserActiveStatus,
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
  forgotPassword,
  resetPassword,
  updateUserAddress,
  deleteUserAddress,
};
