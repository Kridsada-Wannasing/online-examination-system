const db = require("../models");

const createScore = async (req, res, next) => {
  const yourExamLog = await db.Examlog.findAll({
    attributes: ["answer"],
    where: {
      studentId: req.user.studentId,
      examId: req.params.examId,
    },
  });

  const collectAnswer = await db.QuestionExam.findAll({
    attributes: ["questionId"],
    where: {
      examId: req.params.examId,
    },
    include: {
      model: db.Question,
      include: [db.Answer],
    },
  });

  const newScore = await db.Score.create(req.body);

  res.status(201).json({
    status: "success",
    message: "สร้างคะแนนสำเร็จ",
    yourExamLog,
    collectAnswer,
  });
};

const getAllScore = async (req, res, next) => {
  const allScore = await db.Score.findAll();

  res.status(200).json({
    status: "success",
    allScore,
  });
};

const getScore = async (req, res, next) => {
  const target = await db.Score.findOne({
    where: { scoreId: req.params.scoreId },
  });

  if (!target) {
    res.status(404).json({
      status: "fail",
      message: "ไม่มีคะแนนนี้",
    });
  }

  res.status(200).json({
    status: "success",
    target,
  });
};

const updateScore = async (req, res, next) => {
  await db.Score.update(req.body, {
    where: { scoreId: req.params.scoreId },
  });

  res.status(200).json({
    status: "succes",
    message: "เปลี่ยนแปลงข้อมูลคะแนนนี้สำเร็จ",
  });
};

const deleteScore = async (req, res, next) => {
  await db.Score.destroy({
    where: { scoreId: req.params.scoreId },
  });

  res.status(204).send();
};

module.exports = {
  createScore,
  getAllScore,
  getScore,
  updateScore,
  deleteScore,
};
