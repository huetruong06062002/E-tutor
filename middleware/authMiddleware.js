const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Middleware xác thực dựa trên vai trò người dùng
const authMiddleware = (roles = []) => {
  // Chuyển đổi roles thành mảng nếu nó là một chuỗi
  if (typeof roles === "string") {
    roles = [roles];
  }

  return async (req, res, next) => {
    // Lấy token từ header
    const token =
      req.header("Authorization") &&
      req.header("Authorization").replace("Bearer ", "");
    if (!token) {
      return res
        .status(401)
        .json({ message: "No token, authorization denied" });
    }

    try {
      // Giải mã token để lấy thông tin người dùng
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.userId);

      if (!req.user) {
        return res.status(401).json({ message: "User not found" });
      }

      // Kiểm tra vai trò người dùng
      if (roles.length && !roles.includes(req.user.role)) {
        return res
          .status(403)
          .json({ message: "Forbidden: You do not have the required role" });
      }

      next();
    } catch (error) {
      res.status(401).json({ message: "Token is not valid" });
    }
  };
};

module.exports = authMiddleware;
