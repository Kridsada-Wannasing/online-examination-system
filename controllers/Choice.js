const db = require("../models");

const createChoice = async (req, res, next) => {
  try {
    const newChoice = await db.Choice.bulkCreate(req.body);

    res.status(201).json({
      status: "success",
      newChoice,
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

const updateChoice = async (req, res, next) => {
  try {
    const updatedChoice = await db.Choice.update(
      { choice: req.body.choice },
      {
        where: { choiceId: req.params.choiceId },
      }
    );

    res.status(200).json({
      status: "success",
      updatedChoice,
    });
  } catch (error) {
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
  updateChoice,
  deleteChoice,
};
