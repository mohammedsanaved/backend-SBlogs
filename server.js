import express from "express";
import cors from "cors";
import { readdirSync } from "fs";
import { connectDB } from "./data/database.js";
import bodyParser from "body-parser";
// const morgan = require("morgan");
// import morgan from "morgan";
// require("dotenv").config();
import "dotenv/config";
const app = express();
import auth from "./routes/authRoutes.js";
// db

connectDB();
export const server = "http://localhost:8000";
// middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json({ limit: "5mb" }));
// app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "*",
    credentials: true, //access-control-allow-credentials:true
    optionSuccessStatus: 200,
  })
);
app.use("/api", auth);

// autoload routes

const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Server running on port ${port}`));
