import User from "../models/userModel.js";
import Monitor from "../models/monitorModel.js";
import Ping from "../models/pingModel.js";
import AppError from "../utils/appError.js";
import bcryptjs from "bcryptjs";
import tokenGeneration from "../utils/generateToken.js";

export const userSignup = async (req, res, next) => {
  try {
    const { user, email, password } = req.body;
    if (!user?.trim() || !email?.trim() || !password?.trim()) {
      return next(new AppError("All fields are required.", 400));
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return next(new AppError("Invalid email address.", 400));
    }

    if (password?.length < 6) {
      return next(
        new AppError("Password must be at least 6 characters long.", 400)
      );
    }

    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return next(new AppError("Email ID already exists.", 400));
    }

    const hashedPassword = await bcryptjs.hash(password, 10);

    const newUser = await User.create({
      user,
      email,
      password: hashedPassword,
    });

    const token = tokenGeneration({
      user: newUser.user,
      userId: newUser._id,
      email: newUser.email,
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // only HTTPS in prod
      sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return res.status(201).json({
      success: true,
      message: "User signup successful.",
    });
  } catch (error) {
    next(error);
  }
};

export const userLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email?.trim() || !password?.trim()) {
      return next(new AppError("All fields are required.", 400));
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return next(new AppError("Invalid email address.", 400));
    }

    const existingUser = await User.findOne({ email: email });
    if (!existingUser) {
      return next(new AppError("Email ID not found.", 404));
    }
    const isMatch = await bcryptjs.compare(password, existingUser?.password);
    if (!isMatch) {
      return next(new AppError("Invalid password", 401));
    }
    const token = tokenGeneration({
      user: existingUser.user,
      userId: existingUser._id,
      email,
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // only HTTPS in prod
      sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return res
      .status(200)
      .json({ success: true, message: "User login successful" });
  } catch (error) {
    next(error);
  }
};

export const userLogout = async (req, res, next) => {
  try {
    res.cookie("token", "", {
      httpOnly: true,
      expires: new Date(0),
      sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
      secure: process.env.NODE_ENV === "production",
    });
    return res.status(200).json({
      success: true,
      message: "Logged out successfully.",
    });
  } catch (error) {
    next(error);
  }
};

export const editProfile = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const { user, email, password } = req.body;

    if (!user.trim() && !email.trim() && !password.trim()) {
      return next(new AppError("Nothing to update.", 400));
    }

    const currentUser = await User.findById(userId);
    if (!currentUser) {
      return next(new AppError("User not found.", 404));
    }

    if (user) currentUser.user = user.trim();
    if (email) currentUser.email = email.trim();

    if (password) {
      if (password.length < 6) {
        return next(
          new AppError("Password must be at least 6 characters long.", 400)
        );
      }
      const hashedPassword = await bcryptjs.hash(password, 10);

      currentUser.password = hashedPassword;
    }

    await currentUser.save();
    res.cookie("token", "", { httpOnly: true, expires: new Date(0) });
    return res.status(200).json({
      success: true,
      message: "Profile updated successfully. Please log in again to continue.",
    });
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const currentUser = await User.findById(userId);
    if (!currentUser) {
      return next(new AppError("User not found.", 404));
    }

    await Ping.deleteMany({ user: userId });
    await Monitor.deleteMany({ user: userId });
    await User.findByIdAndDelete(userId);

    res.cookie("token", "", {
      httpOnly: true,
      expires: new Date(0),
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
    });

    return res.status(200).json({
      success: true,
      message: "User and all associated data deleted successfully.",
    });
  } catch (error) {
    next(error);
  }
};

export const authCheck = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.userId).select("-password");
    if (!user) {
      return next(new AppError("User not found", 404));
    }
    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    next(error);
  }
};
