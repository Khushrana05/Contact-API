import jwt from "jsonwebtoken";
import { User } from "../model/User.js";

export const Auth = async (req, res, next) => {
  try {
    // Get token from headers
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({
        message: "Access Denied. No Token Provided.",
        status: false,
      });
    }

    // Remove Bearer prefix
    const splitToken = token.split(" ")[1];

    // Verify token
    const decoded = jwt.verify(splitToken, "SECRET_KEY");

    // Find user
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({
        message: "Invalid Token",
        status: false,
      });
    }

    // Attach user to request
    req.user = user;

    next();

  } catch (error) {
    return res.status(401).json({
      message: "Unauthorized",
      error: error.message,
      status: false,
    });
  }
};
