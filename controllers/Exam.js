const db = require("../models");

const createExam = async (req, res, next) => {
  const newExam = await db.Exam.create(req.body);

  res.status(201).json({
    status: "success",
    message: "สร้างชุดข้อสอบสำเร็จ",
    newExam,
  });
};

module.exports = {
  createExam,
};
