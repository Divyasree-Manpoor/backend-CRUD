const express = require("express");
const router = express.Router();

const Sale = require("../models/Sale");

const {
  getSales,
  getSingleSale,
  createSale,
  updateSale,
  deleteSale,
} = require("../controllers/salesController");


// 🔹 FIRST N SALES  → /api/sales/first/5
router.get("/first/:limit", async (req, res, next) => {
  try {
    const limit = parseInt(req.params.limit) || 5;

    const sales = await Sale.find()
      .sort({ saleDate: 1 })
      .limit(limit);

    res.json({
      success: true,
      type: "first",
      count: sales.length,
      data: sales,
    });
  } catch (error) {
    next(error);
  }
});


// 🔹 LAST N SALES → /api/sales/last/10
router.get("/last/:limit", async (req, res, next) => {
  try {
    const limit = parseInt(req.params.limit) || 5;

    const sales = await Sale.find()
      .sort({ saleDate: -1 })
      .limit(limit);

    res.json({
      success: true,
      type: "last",
      count: sales.length,
      data: sales,
    });
  } catch (error) {
    next(error);
  }
});


// 🔹 GET ALL SALES (with filters, pagination, query)
router.get("/", getSales);


// 🔹 GET SINGLE SALE BY ID  ⚠️ keep this AFTER above routes
router.get("/:id", getSingleSale);


// 🔹 CREATE SALE
router.post("/", createSale);


// 🔹 UPDATE SALE
router.put("/:id", updateSale);


// 🔹 DELETE SALE
router.delete("/:id", deleteSale);


module.exports = router;