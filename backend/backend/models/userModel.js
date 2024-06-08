import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import crypto from 'crypto';


// Định nghĩa schema cho User
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    gender: {
      type: String,
      required: true,
    },
    fullname: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    born: {
      type: String,
      require: true,
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    avatar: {
      type: String,
      default: "/uploads/avatar/avatarDefault.jpg"
    },
    nameShop: {
      type: String,
      default: ""
    },
    avatarShop: {
      type: String,
      default: ""
    },
    addresses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Address" }],
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    isActive: {
      type: Boolean,
      required: true,
      default: true,
    },
    isDelete: {
      type: Boolean,
      default: false
    },
    hidden: {
      type: Boolean,
      default: false,
    },
    passwordChangeAt: {
      type: String,
    },
    passwordResetToken: {
      type: String,
    },
    passwordRestExpires: {
      type: String,
    },
  },
  { timestamps: true }
);




userSchema.methods.createPasswordChangedToken = function () {
  const resetPassword = crypto.randomBytes(32).toString('hex');
  this.passwordResetToken = crypto.createHash('sha256').update(resetPassword).digest('hex');
  this.passwordRestExpires = Date.now() + 15 * 60 * 1000;
  return resetPassword; // Sửa 'resetToken' thành 'resetPassword'
};

const User = mongoose.model("User", userSchema);

export default User;
