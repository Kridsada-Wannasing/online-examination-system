const db = require("../models");

const mapObjectInArray = (array, questionId) => {
  return array.map((obj) => ({ ...obj, questionId }));
};

const createQuestion = async (req, res, next) => {
  try {
    const newQuestion = await db.Question.create(req.body);

    await db.QuestionExam.create({
      examId: req.body.examId,
      questionId: newQuestion.questionId,
    });

    res.status(201).json({
      status: "success",
      message: "สร้างคำถามสำเร็จ",
      newQuestion,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};

const getAllQuestion = async (req, res, next) => {
  //ส่ง query string มาเพื่อ get ข้อมูลออกไปตาม field ที่กำหนด
  const queryString = req.query;
  console.log(queryString);
  try {
    const allQuestion = await db.Question.findAll({ where: queryString });

    res.status(200).json({
      status: "success",
      allQuestion,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};

const getQuestion = async (req, res, next) => {
  try {
    const target = await db.Question.findOne({
      where: { questionId: req.params.questionId },
      include: [
        {
          model: db.Choice,
        },
        {
          model: db.Image,
        },
        {
          model: db.Answer,
        },
        {
          model: db.QuestionTag,
          include: [db.Tag],
        },
      ],
    });

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

const updateQuestion = async (req, res, next) => {
  try {
    const updatedQuestion = await db.Question.update(req.body, {
      where: { questionId: req.params.questionId },
    });

    res.status(200).json({
      status: "success",
      message: "แก้ไขคำถามสำเร็จ",
      updatedQuestion,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};

const deleteQuestion = async (req, res, next) => {
  try {
    await db.QuestionTag.destroy({
      where: { questionId: req.params.questionId },
    });

    await db.QuestionExam.destroy({
      where: { questionId: req.params.questionId },
    });

    await db.Choice.destroy({
      where: { questionId: req.params.questionId },
    });

    await db.Image.destroy({
      where: { questionId: req.params.questionId },
    });

    await db.Answer.destroy({
      where: { questionId: req.params.questionId },
    });

    await db.Question.destroy({
      where: { questionId: req.params.questionId },
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
  createQuestion,
  getAllQuestion,
  getQuestion,
  updateQuestion,
  deleteQuestion,
};
