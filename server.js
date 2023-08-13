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
import auth from "./routes/auth.js";
// db

connectDB();
export const server = "http://localhost:8000";
// mongoose
//   .connect(
//     `mongodb+srv://mohammedsanaved:mohammedsanaved@sblog.l2yykvj.mongodb.net/?retryWrites=true&w=majority`,
//     {
//       useNewUrlParser: true,
//       // useFindAndModify: false,
//       useUnifiedTopology: true,
//       // useCreateIndex: true,
//     }
//   )
//   .then(() => console.log("DB connected"))
//   .catch((err) => console.log("DB connection error", err));

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
// readdirSync("./routes").map((r) => app.use("/api", require(`./routes/${r}`)));

const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Server running on port ${port}`));
