const db = require("../models");

const getQuestionInExam = async (req, res, next) => {
  try {
    const questionInExam = await db.QuestionExam.findAll({
      where: {
        examId: req.params.examId,
      },
    });

    const uniqueQuestionId = [
      ...new Set(questionInExam.map((item) => item.questionId)),
    ];

    let getQuestions;
    let countAnswer;

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

      countAnswer = await db.Answer.findAll({
        attributes: [
          [db.sequelize.fn("count", db.sequelize.col("answer")), "countAnswer"],
          "questionId",
        ],
        where: {
          questionId: uniqueQuestionId,
        },
        group: db.sequelize.col("questionId"),
      });
    }

    res.status(201).json({
      status: "success",
      getQuestions,
      countAnswer,
    });
  } catch (error) {
    console.log(error);
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
  deleteQuestionInExam,
  getQuestionInExam,
};
