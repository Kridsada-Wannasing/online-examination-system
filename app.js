require("dotenv").config({
  path: "./config.env",
});

const db = require("./models");
const express = require("express");
const morgan = require("morgan");
const app = express();
const studentRoutes = require("./routes/Student");
const cors = require("cors");

require("./config/passport/Student");

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/student", studentRoutes);

if (process.env.NODE_ENV === "development") {
  app.use(morgan());
}

db.sequelize.sync().then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`App running on port ${process.env.PORT}`);
  });
});
