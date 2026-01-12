import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDatabase from "./configs/connectDB.js";
import errorHandler from "./middlewares/errorMiddleware.js";
import userRoute from "./routes/userRoutes.js";
import monitorRoute from "./routes/monitorRoutes.js";
import "../src/services/scheduler.js";

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.get("/health", (req, res) => {
  res.status(200).send("Server working fine.");
});

connectDatabase();

app.use("/api/users/", userRoute);
app.use("/api/monitors/", monitorRoute);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
