import mongoose from "mongoose";



const addressSchema = mongoose.Schema(
  {
    contries: { type: String, required: true },
    city: { type: Number, required: true },
    Street : { type: String, required: true },
    apartment  : { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  { timestamps: true }
);


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

    born:{
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
      default: "/uploads\\avatar\\avatarDefault.jpg"
    },

    nameShop: {
      type: String,
      default: ""
    },

    avatarShop: {
      type: String,
      default: ""
    },

    address: [addressSchema],

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

    isDelete:{
      type: Boolean,
      default:false
    },

    hidden: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
