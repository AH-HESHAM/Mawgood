const jwt = require("jsonwebtoken");
const { checkUserRole } = require("../services/usersInfoServices");

const adminAuthMiddleware = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const role = await checkUserRole(decodedToken.id);
    if (role !== "admin") {
      return res.status(403).json({ message: "Forbidden" });
    }
    req.user = decodedToken;
    next();
  } catch (err) {
    return res.status(401).json({ message: "invalid token" });
  }
};

module.exports = adminAuthMiddleware;
