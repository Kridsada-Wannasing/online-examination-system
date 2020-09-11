const db = require("../models");

const getQuestionInExam = async (req, res, next) => {
  try {
    const newQuestion = await db.QuestionExam.findAll({
      where: {
        examId: req.params.examId,
      },
      include: {
        model: db.Question,
        include: [db.Choice],
      },
    });

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
