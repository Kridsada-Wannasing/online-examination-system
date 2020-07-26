const db = require("../models");
const router = require("../routes/Exam");

const createQuestion = async (req, res, next) => {
  const newQuestion = await db.ObjectiveQuestion.create(req.body);

  res.status(201).json({
    status: "success",
    message: "สร้างคำถามสำเร็จ",
    newQuestion,
  });
};

module.exports = {
  createQuestion,
};
