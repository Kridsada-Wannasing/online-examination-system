require("dotenv").config({
  path: "./config.env",
});

const db = require("./models");
const express = require("express");
const morgan = require("morgan");
const app = express();
const questionRoute = require("./routes/Question");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

if (process.env.NODE_ENV === "development") {
  app.use(morgan());
}

app.use("/question", questionRoute);

db.sequelize.sync().then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`App running on port ${process.env.PORT}`);
  });
});
