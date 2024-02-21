import errResponse from "../utils/error.js";

export const errorHandler = async (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  //mongoose cast error
  if (err.name === "castError") {
    const message = "Resources not Found";
    error = new errResponse(message, 404);
  }

  //duplicate key error
  if (err.code === 11000) {
    const message = "duplicate faile value insert";
    error = new errResponse(message, 400);
  }

  //validation error
  if (err.name === "ValidationError") {
    const message = Object.values(err.errors).map((val) => val.message);
    error = new errResponse(message, 400);
    res.status(error.statusCode || 500).json({
      sucess: false,
      error: error.message || "server error",
    });
  }
};

export default errorHandler;
