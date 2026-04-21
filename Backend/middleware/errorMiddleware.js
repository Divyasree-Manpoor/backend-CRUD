
// 🔴 1. NOT FOUND MIDDLEWARE
// This runs when no route matches
const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error); // pass error to next middleware
};

// 🔴 2. GLOBAL ERROR HANDLER
// This catches ALL errors in the app
const errorHandler = (err, req, res, next) => {
  // If status code is still 200, change it to 500
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  res.status(statusCode);

  res.json({
    success: false,
    message: err.message || "Something went wrong",
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

module.exports = {
  notFound,
  errorHandler,
};