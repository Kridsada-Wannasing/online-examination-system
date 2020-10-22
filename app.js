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
const socketIo = require("socket.io");

const adminRoutes = require("./routes/Admin");

require("./config/passport/Student");
require("./config/passport/Teacher");
require("./config/passport/Admin");

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/static", express.static(path.join(__dirname, "public/img")));

if (process.env.NODE_ENV === "development") {
  app.use(morgan());
}

app.use("/student", studentRoutes);
app.use("/teacher", teacherRoutes);
app.use("/admin", adminRoutes);

const expressServer = app.listen(process.env.PORT, () => {
  console.log(`App running on port ${process.env.PORT}`);
});

const io = socketIo(expressServer);

io.on("connection", (socket) => {
  console.log("Connected: ", socket.id);

  socket.on("disconnect", () => {
    console.log("Disconnected ");
  });
});

db.sequelize.sync({ force: true }).then(() => expressServer);
