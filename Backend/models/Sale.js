
const mongoose = require("mongoose");

// 🔹 ITEM SCHEMA
const itemSchema = new mongoose.Schema({
  name: String,
  price: Number,
  quantity: Number,
});

// 🔹 CUSTOMER SCHEMA
const customerSchema = new mongoose.Schema({
  gender: String,
  age: Number,
  email: String,
  satisfaction: Number,
});

// 🔹 MAIN SALE SCHEMA
const saleSchema = new mongoose.Schema(
  {
    saleDate: {
      type: Date,
      required: true,
    },

    storeLocation: {
      type: String,
      required: true,
    },

    purchaseMethod: {
      type: String,
      required: true,
    },

    couponUsed: {
      type: Boolean,
      default: false,
    },

    // ✅ ITEMS ARRAY
    items: [itemSchema],

    // ✅ CUSTOMER OBJECT
    customer: customerSchema,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Sale", saleSchema);