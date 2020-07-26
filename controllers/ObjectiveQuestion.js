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

const updateQuestion = async (req, res, next) => {
  await db.ObjectiveQuestion.update(req.body, {
    where: { objectiveQuestionId: req.params.questionId },
  });

  res.status(200).json({
    status: "success",
    message: "เปลี่ยนแปลงข้อมูลคำถามปรนัยเรียบร้อย",
  });
};

module.exports = {
  createQuestion,
  updateQuestion,
};
