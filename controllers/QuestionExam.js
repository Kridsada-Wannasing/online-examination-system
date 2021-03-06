const db = require("../models");

const getQuestionInExam = async (req, res, next) => {
  try {
    const questionInExam = await db.QuestionExam.findAll({
      where: {
        examId: req.params.examId,
      },
    });

    if (questionInExam.length == 0) {
      return res.status(200).json({
        status: "success",
        message: "ยังไม่มีคำถามในชุดข้อสอบนี้",
      });
    }

    const uniqueQuestionId = [
      ...new Set(questionInExam.map((item) => item.questionId)),
    ];

    let getQuestions;

    if (Object.keys(req.user.dataValues).includes("teacherId")) {
      getQuestions = await db.Question.findAll({
        where: {
          questionId: uniqueQuestionId,
        },
        include: [db.Choice],
      });
    } else {
      getQuestions = await db.Question.findAll({
        where: {
          questionId: uniqueQuestionId,
        },
        include: [db.Choice, db.Image],
      });
    }

    res.status(200).json({
      status: "success",
      getQuestions,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};

const searchQuestions = async (req, res, next) => {
  try {
    const questionInExam = await db.QuestionExam.findAll({
      attributes: [
        [
          db.Sequelize.fn("DISTINCT", db.Sequelize.col("questionId")),
          "questionId",
        ],
      ],
      where: {
        examId: req.params.examId,
      },
    });

    if (questionInExam.length == 0) {
      return res.status(200).json({
        status: "success",
        message: "ยังไม่มีคำถามในชุดข้อสอบนี้",
      });
    }

    const questionId = questionInExam.map((item) => item.questionId);

    let tags = {};

    if (Array.isArray(req.query.tagId) && req.query.tagId.length > 0) {
      tags.tagId = req.query.tagId;
      delete req.query.tagId;
    }

    let getQuestions = await db.Question.findAll({
      where: {
        questionId: questionId,
        ...req.query,
      },
      include: [
        { model: db.Choice },
        { model: db.QuestionTag, where: tags, include: [db.Tag] },
      ],
    });

    res.status(201).json({
      status: "success",
      getQuestions,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};

const addQuestionToExam = async (req, res, next) => {
  try {
    const newQuestion = await db.QuestionExam.bulkCreate(req.body);

    res.status(201).json({
      status: "success",
      newQuestion,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};

const importQuestionsInExam = async (req, res, next) => {
  try {
    const newQuestionInExam = await db.QuestionExam.bulkCreate(req.body);

    let target = newQuestionInExam.map((question) => question.questionId);

    const newQuestion = await db.Question.findAll({
      where: {
        questionId: target,
      },
      include: [db.Choice],
    });

    res.status(201).json({
      status: "success",
      message: "เพิ่มคำถามจากชุดข้อสอบที่มีอยู่สำเร็จ",
      newQuestion,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};

const deleteQuestionInExam = async (req, res, next) => {
  //ส่ง questionId มาเป็นอาเรย์ของ id ที่ต้องดารลบ
  const { deleteRows } = req.body;
  try {
    await db.QuestionExam.destroy({
      where: {
        questionExamId: deleteRows,
      },
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
  addQuestionToExam,
  searchQuestions,
  importQuestionsInExam,
  deleteQuestionInExam,
  getQuestionInExam,
};
