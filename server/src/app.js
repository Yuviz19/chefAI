import express from "express";
import helmet from "helmet";
import compression from "compression";
import cors from "cors";
import { errorHandler } from "./middlewares/errorHandler.js";

const app = express();
app.use(helmet());
app.use(compression());

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({
  extended: true, limit: "16kb"
}));
app.use(express.static("public"));

const allowOrigin = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(",").map((origin) => origin.trim())
  : "http://localhost:5173";

app.use(cors({
  origin: allowOrigin,
  credentials: true,
  methods: ["GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

import healthCheckRoute from "./routes/healthCheck.routes.js";
app.use("/api/v1/healthCheck", healthCheckRoute);

app.use(errorHandler);

export { app };
