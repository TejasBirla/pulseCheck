import express from "express";
import {
  userSignup,
  userLogin,
  authCheck,
  userLogout,
  editProfile,
  deleteUser,
} from "../controllers/userController.js";
import authWare from "../middlewares/authMiddleware.js";

const userRoute = express.Router();

userRoute.post("/user-signup", userSignup);
userRoute.post("/user-login", userLogin);
userRoute.get("/me", authWare, authCheck);
userRoute.post("/user-logout", authWare, userLogout);
userRoute.patch("/user-update", authWare, editProfile);
userRoute.delete("/user-delete", authWare, deleteUser);

export default userRoute;
