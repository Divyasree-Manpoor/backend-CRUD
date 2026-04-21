const Sale = require("../models/Sale");

// ✅ GET SALES (ADVANCED + COMPLETE)
exports.getSales = async (req, res, next) => {
  try {
    let { limit, type, page, location, method } = req.query;

    // 🔹 DEFAULT VALUES
    limit = parseInt(limit) || 20; // default 20
    page = parseInt(page) || 1;

    const skip = (page - 1) * limit;

    // 🔹 FILTER OBJECT
    let filter = {};

    if (location) {
      filter.storeLocation = location;
    }

    if (method) {
      filter.purchaseMethod = method;
    }

    // 🔹 BASE QUERY
    let query = Sale.find(filter);

    // 🔹 SORTING
    if (type === "first") {
      query = query.sort({ saleDate: 1 }); // oldest first
    } else {
      // default + last
      query = query.sort({ saleDate: -1 }); // latest first
    }

    // 🔹 APPLY PAGINATION
    const sales = await query.skip(skip).limit(limit);

    // 🔹 TOTAL COUNT
    const totalRecords = await Sale.countDocuments(filter);

    res.json({
      success: true,
      totalRecords,
      currentPage: page,
      totalPages: Math.ceil(totalRecords / limit),
      limit,
      type: type || "default",
      filters: {
        location: location || null,
        method: method || null,
      },
      data: sales,
    });

  } catch (error) {
    next(error); // ✅ send to error middleware
  }
};

// ✅ CREATE SALE
exports.createSale = async (req, res, next) => {
  try {
    const sale = new Sale(req.body);
    const saved = await sale.save();

    res.status(201).json({
      success: true,
      message: "Sale created successfully",
      data: saved,
    });

  } catch (error) {
    next(error);
  }
};

// ✅ UPDATE SALE
exports.updateSale = async (req, res, next) => {
  try {
    const updated = await Sale.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updated) {
      res.status(404);
      throw new Error("Sale not found");
    }

    res.json({
      success: true,
      message: "Sale updated successfully",
      data: updated,
    });

  } catch (error) {
    next(error);
  }
};

// ✅ DELETE SALE
exports.deleteSale = async (req, res, next) => {
  try {
    const deleted = await Sale.findByIdAndDelete(req.params.id);

    if (!deleted) {
      res.status(404);
      throw new Error("Sale not found");
    }

    res.json({
      success: true,
      message: "Sale deleted successfully",
    });

  } catch (error) {
    next(error);
  }
};
// ✅ GET SINGLE SALE
exports.getSingleSale = async (req, res, next) => {
  try {
    const sale = await Sale.findById(req.params.id);

    if (!sale) {
      res.status(404);
      throw new Error("Sale not found");
    }

    res.json({
      success: true,
      data: sale,
    });

  } catch (error) {
    next(error);
  }
};