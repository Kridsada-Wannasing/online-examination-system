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
    include: [
      {
        model: db.ObjectiveAnswer,
        required: false,
      },
      {
        model: db.QuestionTag,
        include: [db.Tag],
        required: false,
      },
    ],
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

const updateQuestion = async (req, res, next) => {
  await db.ObjectiveQuestion.update(req.body, {
    where: { objectiveQuestionId: req.params.questionId },
  });

  res.status(200).json({
    status: "success",
    message: "เปลี่ยนแปลงข้อมูลคำถามปรนัยเรียบร้อย",
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
  getAllQuestion,
  getQuestion,
  updateQuestion,
  deleteQuestion,
};
