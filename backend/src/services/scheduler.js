import cron from "node-cron";
import { pingAllMonitors } from "./pingService.js";

cron.schedule("* * * * *", async () => {
  console.log("Running schedule ping jobs");
  await pingAllMonitors();
});
