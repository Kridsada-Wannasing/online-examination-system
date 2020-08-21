require("dotenv").config({
  path: "./config.env",
});

const db = require("./models");
const express = require("express");
const morgan = require("morgan");
const app = express();
const studentRoutes = require("./routes/Student");
const teacherRoute = require("./routes/Teacher");
const examRoute = require("./routes/Exam");
const questionRoute = require("./routes/Question");
const scoreRoute = require("./routes/Score");

require("./config/passport/Student");
require("./config/passport/Teacher");
const examLogRoute = require("./models/ExamLog");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

if (process.env.NODE_ENV === "development") {
  app.use(morgan());
}

app.use("/student", studentRoutes);
app.use("/teacher", teacherRoute);
app.use("/exam", examRoute);
app.use("/question", questionRoute);
app.use("/score", scoreRoute);
app.use("/exam-log", examLogRoute);

db.sequelize.sync().then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`App running on port ${process.env.PORT}`);
  });
});
