import axios from "axios";
import Monitor from "../models/monitorModel.js";
import Ping from "../models/pingModel.js";
import { sendMail, generateStatusEmail } from "../utils/sendMails.js";

const pingMonitor = async (monitor) => {
  let status = "up"; // assume healthy
  let responseTime = null;
  const start = Date.now();
  const oldStatus = monitor?.status;
  try {
    await axios.get(`${monitor.protocol.toLowerCase()}://${monitor.url}`, {
      timeout: 5000,
    });

    responseTime = Date.now() - start;
  } catch (error) {
    status = "down";
  }

  // Save ping history
  await Ping.create({
    monitor: monitor._id,
    user: monitor.user._id,
    status,
    responseTime,
  });

  // Update monitor current state
  monitor.status = status;
  monitor.lastPing = new Date();
  await monitor.save();

  if (oldStatus && oldStatus !== status) {
    const userEmail = monitor.user.email;
    const subject = `PulseCheck Alert: "${
      monitor.name
    }" is now ${status.toUpperCase()}`;
    const html = generateStatusEmail(monitor, oldStatus, status);
    await sendMail(userEmail, subject, html);
  }

  return { monitorId: monitor._id, status, responseTime };
};

export const pingAllMonitors = async () => {
  const monitors = await Monitor.find().populate("user");
  if (monitors.length === 0) return console.log("No monitors to check.");
  let now = new Date();

  for (const monitor of monitors) {
    monitor.protocol = monitor.protocol || "HTTP";
    const minutesSinceLastPing = monitor.lastPing
      ? (now - monitor.lastPing) / 60000
      : Infinity;
    if (minutesSinceLastPing >= monitor.interval) {
      await pingMonitor(monitor);
    }
  }
  console.log("All monitors pinged successfully.");
};
