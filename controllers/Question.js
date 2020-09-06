const db = require("../models");

const createQuestion = async (req, res, next) => {
  const newQuestion = await db.Question.create(req.body);

  res.status(201).json({
    status: "success",
    message: "สร้างคำถามสำเร็จ",
    newQuestion,
  });
};

const getAllQuestion = async (req, res, next) => {
  const allQuestion = await db.Question.findAll();

  res.status(200).json({
    status: "success",
    allQuestion,
  });
};

const getQuestion = async (req, res, next) => {
  const target = await db.Question.findOne({
    where: { questionId: req.params.questionId },
    include: [
      {
        model: db.Answer,
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
  await db.Question.update(req.body, {
    where: { questionId: req.params.questionId },
  });

  res.status(200).json({
    status: "success",
    message: "เปลี่ยนแปลงข้อมูลคำถามปรนัยเรียบร้อย",
  });
};

const deleteQuestion = async (req, res, next) => {
  await db.Question.destroy({
    where: { questionId: req.params.questionId },
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
