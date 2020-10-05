const db = require("../models");

const mapObjectInArray = (array, questionId) => {
  return array.map((obj) => ({ ...obj, questionId }));
};

const createAnswer = async (req, res, next) => {
  try {
    const newAnswers = await db.Answer.bulkCreate(req.body);

    const question = await db.Question.findOne({
      where: {
        questionId: newAnswers[0].questionId,
      },
    });

    res.status(201).json({
      status: "success",
      newAnswers,
      question,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};

const getAllAnswer = async (req, res, next) => {
  try {
    const allAnswer = await db.Answer.findAll();

    res.status(200).json({
      status: "success",
      allAnswer,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};

const getAnswersInQuestion = async (req, res, next) => {
  try {
    let answers = await db.Answer.findAll({
      attributes: ["answer"],
      where: { questionId: req.params.questionId },
    });

    const answersInQuestion = answers.map((answer) => answer.answer);

    res.status(200).json({
      status: "success",
      answersInQuestion,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};

const updateAnswer = async (req, res, next) => {
  try {
    await db.Answer.destroy({
      where: { questionId: req.body[0].questionId },
    });

    const updatedAnswer = await db.Answer.bulkCreate(req.body);

    const question = await db.Question.findOne({
      where: {
        questionId: updatedAnswer[0].questionId,
      },
    });

    res.status(200).json({
      status: "success",
      updatedAnswer,
      question,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};

const deleteAnswer = async (req, res, next) => {
  try {
    await db.Answer.destroy({
      where: { answerId: req.body.answerId },
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
  createAnswer,
  getAllAnswer,
  getAnswersInQuestion,
  updateAnswer,
  deleteAnswer,
};
