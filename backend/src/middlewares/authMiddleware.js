import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
import AppError from "../utils/appError.js";

const authWare = (req, res, next) => {
  try {
    const token = req.cookies?.token; // read token from cookie
    if (!token) {
      return next(new AppError("Not authorized, token missing.", 401));
    }

    const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);
    req.user = decodedToken;
    next();
  } catch (error) {
    return next(new AppError("Invalid or expired token.", 401));
  }
};

export default authWare;
