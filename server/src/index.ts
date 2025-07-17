import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { server, app } from "./utils/socket";
import connectDB from "./config/db";
import authRoutes from "./routes/auth.route";
import messageRoutes from "./routes/message.route";

dotenv.config();

connectDB();

const PORT = Number(process.env.PORT) || 3000;
const HOST = process.env.HOST || "0.0.0.0";

app.use(express.json());
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

server.listen(PORT, HOST, () => {
  console.log(`🚀Server is running on http://${HOST}:${PORT}`);
});
