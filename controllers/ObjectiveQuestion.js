const db = require("../models");

const createQuestion = async (req, res, next) => {
  const newQuestion = await db.ObjectiveQuestion.create(req.body);

  res.status(201).json({
    status: "success",
    message: "สร้างคำถามสำเร็จ",
    newQuestion,
  });
};

const getAllQuestion = async (req, res, next) => {
  const allQuestion = await db.ObjectiveQuestion.findAll();

  res.status(200).json({
    status: "success",
    allQuestion,
  });
};

const getQuestion = async (req, res, next) => {
  const target = await db.ObjectiveQuestion.findOne({
    where: { objectiveQuestionId: req.params.questionId },
  });

  if (!target) {
    res.status(404).json({
      status: "fail",
      message: "ไม่มีคำถามนี้ในระบบ",
    });
  }

  res.status(200).json({
    status: "success",
    target,
  });
};

module.exports = {
  createQuestion,
  getAllQuestion,
  getQuestion,
};
