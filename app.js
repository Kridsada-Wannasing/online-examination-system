require("dotenv").config({
  path: "./config.env",
});

const db = require("./models");
const express = require("express");
const morgan = require("morgan");
const app = express();
const studentRoutes = require("./routes/Student");
const teacherRoutes = require("./routes/Teacher");
const cors = require("cors");
const path = require("path");

require("./config/passport/Student");
require("./config/passport/Teacher");

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/static", express.static(path.join(__dirname, "public/img")));

if (process.env.NODE_ENV === "development") {
  app.use(morgan());
}

app.use("/student", studentRoutes);
app.use("/teacher", teacherRoutes);

db.sequelize.sync().then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`App running on port ${process.env.PORT}`);
  });
});
