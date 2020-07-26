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

const deleteQuestion = async (req, res, next) => {
  await db.ObjectiveQuestion.destroy({
    where: { objectiveQuestionId: req.params.questionId },
  });

  res.status(204).send();
};

module.exports = {
  createQuestion,
  deleteQuestion,
};
