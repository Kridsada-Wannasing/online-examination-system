const db = require("../models");

const addTagToQuestion = async (req, res, next) => {
  try {
    const tagOfQuestion = await db.QuestionTag.bulkCreate(req.body);

    res.status(400).json({
      status: "success",
      tagOfQuestion,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};

const updateTagOfQuestion = async (req, res, next) => {
  try {
    await db.QuestionTag.destroy({
      where: {
        questionId: req.body.questionId,
      },
    });

    const updatedTagOfQuestion = await db.QuestionTag.bulkCreate(req.body);

    res.status(400).json({
      status: "success",
      updatedTagOfQuestion,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};

const deleteTagOfQuestion = async (req, res, next) => {
  try {
    await db.QuestionTag.destroy({
      where: {
        questionTagId: req.body.questionTagId,
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
  addTagToQuestion,
  updateTagOfQuestion,
  deleteTagOfQuestion,
};
