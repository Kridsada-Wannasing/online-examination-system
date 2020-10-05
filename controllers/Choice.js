const db = require("../models");

const mapObjectInArray = (array, questionId) => {
  return array.map((obj) => ({ ...obj, questionId }));
};

const createChoice = async (req, res, next) => {
  try {
    const newChoices = await db.Choice.bulkCreate(req.body);

    const question = await db.Question.findOne({
      where: {
        questionId: newChoices[0].questionId,
      },
      include: [db.Choice],
    });

    res.status(201).json({
      status: "success",
      newChoices,
      question,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};

const getAllChoice = async (req, res, next) => {
  try {
    const allChoice = await db.Choice.findAll();

    res.status(200).json({
      status: "success",
      allChoice,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};

const getChoicesInQuestion = async (req, res, next) => {
  try {
    const choicesInQuestion = await db.Choice.findAll({
      where: { questionId: req.params.questionId },
    });

    res.status(200).json({
      status: "success",
      choicesInQuestion,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};

const updateChoice = async (req, res, next) => {
  try {
    await db.Choice.destroy({
      where: { questionId: req.body[0].questionId },
    });

    const updatedChoice = await db.Choice.bulkCreate(req.body);

    const question = await db.Question.findOne({
      where: {
        questionId: req.body[0].questionId,
      },
      include: [db.Choice],
    });

    res.status(200).json({
      status: "success",
      updatedChoice,
      question,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};

const deleteChoice = async (req, res, next) => {
  try {
    await db.Choice.destroy({
      where: { choiceId: req.body.choiceId },
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
  createChoice,
  getAllChoice,
  getChoicesInQuestion,
  updateChoice,
  deleteChoice,
};
