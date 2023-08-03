import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { readdirSync } from "fs";

const morgan = require("morgan");
require("dotenv").config();

const app = express();

// db
mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@sblog.bqq0z8v.mongodb.net/?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      // useFindAndModify: false,
      useUnifiedTopology: true,
      // useCreateIndex: true,
    }
  )
  .then(() => console.log("DB connected"))
  .catch((err) => console.log("DB connection error", err));

// middlewares
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    // origin: ["*"],
    // methods: ["GET", "POST"],
    // allowedHeaders: ["Content-type"],

    origin: "*",
    credentials: true, //access-control-allow-credentials:true
    optionSuccessStatus: 200,
  })
);

// autoload routes
readdirSync("./routes").map((r) => app.use("/api", require(`./routes/${r}`)));

const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Server running on port ${port}`));

// import express from "express";

// import mongoose from "mongoose";
// import cors from "cors";
// import { readdirSync } from "fs";

// const morgan = require("morgan");
// require("dotenv").config();

// const app = express();
// const http = require("http").createServer(app);

// const io = require("socket.io")(http, {
//   cors: {
//     origin: "*",
//     methods: ["GET", "POST"],
//     allowedHeaders: ["Content-type"],
//   },
// });

// //db

// mongoose
//   .connect(
//     `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.roytcnv.mongodb.net/?retryWrites=true&w=majority`,
//     {
//       useNewUrlParser: true,
//       // useFindAndModify: false,
//       useUnifiedTopology: true,
//       // useCreateIndex: true,
//     }
//   )
//   .then(() => console.log("DB connected"))
//   .catch((err) => console.log("DB connection error", err));

// app.use(
//   express.json({
//     limit: "5mb",
//   })
// );

// app.use(express.urlencoded({ extended: true }));
// app.use(
//   cors({
//     origin: [process.env.CLIENT_URL],
//   })
// );

// //autoload routes

// readdirSync("./routes").map((r) => app.use("/api", require(`./routes/${r}`)));

// const port = process.env.PORT || 8000;

// http.listen(port, () => `Server running on port ${port} `);
