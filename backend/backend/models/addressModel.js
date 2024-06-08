import mongoose from "mongoose";

const addressSchema = mongoose.Schema(
    {
      countries: { type: String, required: true },
      city: { type: String, required: true },
      street: { type: String, required: true },
      apartment: { type: String, required: true }
    },
    { timestamps: true }
  );

  const Address = mongoose.model("Address", addressSchema);

export default Address;