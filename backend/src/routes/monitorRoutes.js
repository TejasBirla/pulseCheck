import express from "express";
import {
  viewAllMonitors,
  createMonitor,
  viewSingleMonitor,
  viewMonitorHistory,
  deleteMonitor,
} from "../controllers/monitorController.js";

import authWare from "../middlewares/authMiddleware.js";

const monitorRoute = express.Router();

monitorRoute.get("/all-monitors", authWare, viewAllMonitors);
monitorRoute.post("/add-monitor", authWare, createMonitor);
monitorRoute.get("/single-monitor/:monitorId", authWare, viewSingleMonitor);
monitorRoute.get("/monitor-history/:monitorId", authWare, viewMonitorHistory);
monitorRoute.delete("/delete-monitor/:monitorId", authWare, deleteMonitor);

export default monitorRoute;
