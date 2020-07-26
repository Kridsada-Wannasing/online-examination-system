const db = require("../models");

const createSubject = async (req, res, next) => {
  const newSubject = await db.Subject.create(req.body);

  res.status(201).json({
    status: "success",
    message: "สร้างรายวิชาสำเร็จ",
    newSubject,
  });
};

module.exports = {
  createSubject,
};
