const db = require("../models");
const { Op } = require("sequelize");
const Score = require("../utils/Score");
const createScore = async (req, res, next) => {
  try {
    const { examId, subjectId, meetingId } = req.body;

    const sum = await db.QuestionExam.findAll({
      attributes: ["questionId"],
      where: {
        examId: examId,
      },
      include: {
        model: db.Question,
        required: true,
        attributes: [
          [
            db.sequelize.fn("SUM", db.sequelize.col("sumScoreQuestion")),
            "sumScore",
          ],
          [
            db.sequelize.fn("COUNT", db.sequelize.col("question")),
            "countAllQuestion",
          ],
        ],
      },
    });

    const countObjective = await db.QuestionExam.findAll({
      attributes: ["questionId"],
      where: {
        examId: examId,
      },
      include: {
        model: db.Question,
        required: true,
        where: {
          questionType: "ปรนัย",
        },
        attributes: [
          [
            db.sequelize.fn("COUNT", db.sequelize.col("question")),
            "countQuestion",
          ],
        ],
      },
    });

    console.log(countObjective.length);
    console.log(countObjective.QuestionExam.dataValues);
    console.log(countObjective.QuestionExam.questionId);

    if (!countObjective.length) {
      return res.status(201).json({
        status: "success",
        message: "ส่งข้อสอบอัตนัยสำเร็จ",
      });
    }

    const calculateScore = await db.ExamLog.findAll({
      attributes: ["questionId", "examId"],
      where: {
        studentId: req.user.studentId,
        examId: req.body.examId,
      },
      include: {
        model: db.Question,
        required: true,
        where: {
          questionType: "ปรนัย",
        },
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

    await db.StudentMeeting.destroy({
      where: { studentId: req.user.studentId, meetingId: meetingId },
    });

    const score = Number(calculateScore[0].Question.Answers[0].score);

    const sumScore = Number(sum[0].Question.dataValues.sumScore);
    const countQuestion = Number(
      countObjective[0].Question.dataValues.countQuestion
    );
    const countAllQuestion = Number(
      sum[0].Question.dataValues.countAllQuestion
    );

    const isCompleted = countAllQuestion == countQuestion;

    const newScore = await db.Score.create({
      studentId: req.user.studentId,
      score,
      sum: sumScore,
      examId,
      meetingId,
      subjectId,
      isCompleted,
      countAllQuestion,
      countQuestion,
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
    let user = {};
    if (req.user.dataValues.hasOwnProperty("studentId"))
      user.studentId = req.user.studentId;

    const allScore = await db.Score.findAll({
      where: { ...user, ...req.query },
      include: [
        {
          model: db.Exam,
          attributes: {
            exclude: ["term", "year", "examType", "createdAt", "updatedAt"],
          },
          required: true,
        },
        {
          model: db.Student,
          attributes: { exclude: ["password", "createdAt", "updatedAt"] },
          required: true,
        },
        {
          model: db.Subject,
          attributes: { exclude: ["createdAt", "updatedAt"] },
          required: true,
        },
        {
          model: db.Meeting,
          attributes: { exclude: ["createdAt", "updatedAt"] },
          required: true,
        },
      ],
    });

    const scores = allScore.map((element) => ({
      student: element.Student,
      subject: element.Subject.subjectName,
      subjectId: element.Subject.subjectId,
      exam: element.Exam.examName,
      examId: element.Exam.examId,
      examType: element.Meeting.examType,
      term: element.Meeting.term,
      year: element.Meeting.year,
      sum: element.sum,
      score: element.score,
      scoreId: element.scoreId,
      isCompleted: element.isCompleted,
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

const getScoresForStudent = async (req, res, next) => {
  try {
    const allScore = await db.Score.findAll({
      where: { studentId: req.user.studentId },
      include: [
        {
          model: db.Subject,
          required: true,
        },
        {
          model: db.Meeting,
          attributes: { exclude: ["createdAt", "updatedAt"] },
          required: true,
        },
      ],
    });

    const scores = allScore.map((element) => ({
      student: element.Student,
      subjectName: element.Subject.subjectName,
      subjectId: element.Subject.subjectId,
      examType: element.Meeting.examType,
      term: element.Meeting.term,
      year: element.Meeting.year,
      sum: element.sum,
      score: element.score,
      isCompleted: element.isCompleted,
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
    await db.ExamLog.update(
      {
        isChecking: true,
      },
      {
        where: {
          examLogId: req.params.examLogId,
        },
      }
    );

    console.log(req.body);

    const score = await db.Score.findOne({
      attributes: ["countAllQuestion", "countQuestion"],
      where: {
        scoreId: req.params.scoreId,
      },
    });

    if (score.countAllQuestion == score.countQuestion + 1) {
      await db.Score.update(
        {
          ...req.body,
          isCompleted: true,
          countQuestion: score.countAllQuestion,
        },
        {
          where: { scoreId: req.params.scoreId },
        }
      );

      const sendScore = await db.Score.findOne({
        attributes: ["sum", "score", "isCompleted"],
        where: {
          scoreId: req.params.scoreId,
        },
        include: [
          {
            model: db.Student,
            attributes: ["studentId", "firstName", "lastName", "email"],
            required: true,
          },
          {
            model: db.Subject,
            attributes: ["subjectName"],
            required: true,
          },
          {
            model: db.Meeting,
            attributes: ["examType", "term", "year"],
            required: true,
          },
        ],
      });

      await new Score(
        sendScore,
        sendScore.Student,
        sendScore.Meeting,
        sendScore.Subject.subjectName
      ).sendScore();

      return res.status(200).json({
        status: "success",
        message: "เปลี่ยนแปลงข้อมูลคะแนนนี้สำเร็จ",
        score: sendScore,
      });
    } else {
      await db.Score.update(
        {
          ...req.body,
          countQuestion: score.countQuestion + 1,
        },
        {
          where: { scoreId: req.params.scoreId },
        }
      );

      const currentScore = await db.Score.findOne({
        attributes: ["score", "isCompleted"],
        where: {
          scoreId: req.params.scoreId,
        },
      });

      return res.status(200).json({
        status: "success",
        message: "เปลี่ยนแปลงข้อมูลคะแนนนี้สำเร็จ",
        score: currentScore,
      });
    }
  } catch (error) {
    console.log(error);
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
  getScoresForStudent,
  getScore,
  updateScore,
  deleteScore,
};
