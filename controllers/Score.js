const db = require("../models");

const createScore = async (req, res, next) => {
  try {
    const yourExamLog = await db.Examlog.findAll({
      attributes: ["questionId", "answer"],
      where: {
        studentId: req.user.studentId,
        examId: req.params.examId,
      },
    });

    const unique = [...new Set(yourExamLog.map((item) => item.questionId))];

    const collectAnswer = await db.Question.findAll({
      where: unique,
      include: [db.Answer],
    });

    //const newScore = await db.Score.create(req.body);

    res.status(201).json({
      status: "success",
      message: "สร้างคะแนนสำเร็จ",
      yourExamLog,
      collectAnswer,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};

const getAllScore = async (req, res, next) => {
  try {
    const allScore = await db.Score.findAll({
      where: {
        studentId: req.user.studentId,
      },
    });

    res.status(200).json({
      status: "success",
      allScore,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};

const getScore = async (req, res, next) => {
  try {
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
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};

const updateScore = async (req, res, next) => {
  try {
    await db.Score.update(req.body, {
      where: { scoreId: req.params.scoreId },
    });

    res.status(200).json({
      status: "succes",
      message: "เปลี่ยนแปลงข้อมูลคะแนนนี้สำเร็จ",
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};

const deleteScore = async (req, res, next) => {
  try {
    await db.Score.destroy({
      where: { scoreId: req.params.scoreId },
    });

    res.status(204).send();
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};

module.exports = {
  createScore,
  getAllScore,
  getScore,
  updateScore,
  deleteScore,
};
