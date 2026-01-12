import AppError from "../utils/appError.js";
import Monitor from "../models/monitorModel.js";
import Ping from "../models/pingModel.js";
import mongoose from "mongoose";

export const viewAllMonitors = async (req, res, next) => {
  try {
    const monitors = await Monitor.find({ user: req.user.userId });

    res.status(200).json({
      success: true,
      message: "Monitors fetched successfully.",
      monitors,
    });
  } catch (error) {
    next(error);
  }
};

export const createMonitor = async (req, res, next) => {
  try {
    let { name, url, interval, protocol } = req.body;
    if (!name?.trim() || !url?.trim()) {
      return next(new AppError("Name and URL are required.", 400));
    }

    protocol = protocol?.toUpperCase();

    if (!["HTTP", "HTTPS"].includes(protocol)) {
      return next(new AppError("Invalid protocol selected.", 400));
    }

    url = url.trim().replace(/^https?:\/\//i, "");

    const fullUrl = `${protocol.toLowerCase()}://${url}`;

    try {
      new URL(fullUrl);
    } catch (err) {
      return next(new AppError("Invalid URL format.", 400));
    }

    if (interval && (isNaN(interval) || interval <= 0)) {
      return next(new AppError("Interval must be a positive number.", 400));
    }

    const existingMonitor = await Monitor.findOne({
      user: req.user.userId,
      url,
      protocol,
    });

    if (existingMonitor) {
      return next(new AppError("This monitor already exists.", 409));
    }

    const monitor = await Monitor.create({
      user: req.user.userId,
      name: name.trim(),
      url,
      interval,
      protocol,
    });

    return res.status(201).json({
      success: true,
      message: "Monitor created successfully.",
      monitor,
    });
  } catch (error) {
    next(error);
  }
};

export const viewSingleMonitor = async (req, res, next) => {
  try {
    const { monitorId } = req.params;
    if (!monitorId) {
      return next(new AppError("Monitor ID is required.", 400));
    }

    if (!mongoose.Types.ObjectId.isValid(monitorId)) {
      return next(new AppError("Invalid monitor ID.", 400));
    }

    const monitor = await Monitor.findById(monitorId);

    if (!monitor) {
      return next(new AppError("Monitor not found.", 404));
    }

    return res
      .status(200)
      .json({ success: true, message: "Monitor found.", monitor });
  } catch (error) {
    next(error);
  }
};

export const viewMonitorHistory = async (req, res, next) => {
  try {
    const { monitorId } = req.params;
    if (!monitorId) {
      return next(new AppError("Monitor ID is required.", 400));
    }
    if (!mongoose.Types.ObjectId.isValid(monitorId)) {
      return next(new AppError("Invalid monitor ID.", 400));
    }
    const monitor = await Monitor.findById(monitorId);
    if (!monitor) {
      return next(new AppError("Monitor not found.", 404));
    }

    const history = await Ping.find({ monitor: monitorId })
      .sort({ checkedAt: -1 })
      .limit(10)
      .select("status responseTime checkedAt");

    return res.status(200).json({
      success: true,
      message: "Monitor history fetched successfully.",
      history,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteMonitor = async (req, res, next) => {
  try {
    const { monitorId } = req.params;
    if (!monitorId) {
      return next(new AppError("Monitor ID is required.", 400));
    }
    if (!mongoose.Types.ObjectId.isValid(monitorId)) {
      return next(new AppError("Invalid monitor ID.", 400));
    }
    const monitor = await Monitor.findById(monitorId);
    if (!monitor) {
      return next(new AppError("Monitor not found.", 404));
    }

    if (monitor?.user.toString() !== req.user.userId) {
      return next(new AppError("Not authorized to delete this monitor.", 403));
    }

    await Ping.deleteMany({ monitor: monitorId });

    await Monitor.findByIdAndDelete(monitorId);

    return res.status(200).json({ success: true, message: "Monitor deleted." });
  } catch (error) {
    next(error);
  }
};
