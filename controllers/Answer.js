const db = require("../models");

const createAnswer = async (req, res, next) => {
  try {
    const newAnswer = await db.Answer.bulkCreate(req.body);

    res.status(201).json({
      status: "success",
      newAnswer,
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

const updateAnswer = async (req, res, next) => {
  try {
    const updatedAnswer = await db.Answer.update(
      { answer: req.body.answer },
      {
        where: { answerId: req.params.answerId },
      }
    );

    res.status(200).json({
      status: "success",
      updatedAnswer,
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
  updateAnswer,
  deleteAnswer,
};
