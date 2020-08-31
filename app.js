require("dotenv").config({
  path: "./config.env",
});

const db = require("./models");
const express = require("express");
const morgan = require("morgan");
const app = express();
const studentRoutes = require("./routes/Student");
const examLogRoutes = require("./routes/ExamLog");
const scoreRoutes = require("./routes/Score");
const questionRoutes = require("./routes/Question");

require("./config/passport/Student");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/student", studentRoutes);
app.use("/log", examLogRoutes);
app.use("/score", scoreRoutes);
app.use("/question", questionRoutes);

if (process.env.NODE_ENV === "development") {
  app.use(morgan());
}

db.sequelize.sync().then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`App running on port ${process.env.PORT}`);
  });
});
