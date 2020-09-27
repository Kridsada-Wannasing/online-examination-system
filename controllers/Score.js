const db = require("../models");
const { Op } = require("sequelize");
const createScore = async (req, res, next) => {
  try {
    const sum = await db.Answer.sum(["score"]);

    const calculateScore = await db.ExamLog.findAll({
      attributes: ["questionId", "examId"],
      where: {
        studentId: req.user.studentId,
        examId: req.body.examId,
      },
      include: {
        model: db.Question,
        required: true,
        attributes: ["questionId"],
        include: {
          model: db.Answer,
          required: true,
          attributes: [
            [db.sequelize.fn("SUM", db.sequelize.col("score")), "score"],
          ],
          where: {
            answer: {
              [Op.eq]: db.sequelize.col("ExamLog.answer"),
            },
          },
        },
      },
    });

    const score = Number(calculateScore[0].Question.Answers[0].score);

    const { examId } = req.body;
    const newScore = await db.Score.create({
      studentId: req.user.studentId,
      score,
      sum,
      examId,
    });

    res.status(201).json({
      status: "success",
      message: "สร้างคะแนนสำเร็จ",
      newScore,
    });
  } catch (error) {
    console.log(error);
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
      include: {
        model: db.Exam,
        required: true,
        include: {
          model: db.Subject,
          required: true,
        },
      },
    });

    const scores = allScore.map((element) => ({
      subject: element.Exam.Subject.subjectName,
      exam: element.Exam.examName,
      examType: element.Exam.examType,
      term: element.Exam.term,
      year: element.Exam.year,
      sum: element.sum,
      score: element.score,
    }));

    res.status(200).json({
      status: "success",
      scores,
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
