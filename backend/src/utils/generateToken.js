import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const tokenGeneration = (userData) => {
  const token = jwt.sign(userData, process.env.SECRET_TOKEN, {
    expiresIn: "7d",
  });
  return token;
};

export default tokenGeneration;
