const db = require("../models");

const mapObjectInArray = (array, questionId) => {
  return array.map((obj) => ({ ...obj, questionId }));
};

const getTagsInQuestion = async (req, res, next) => {
  try {
    const tagsOfQuestion = await db.QuestionTag.findAll({
      where: {
        questionId: req.params.questionId,
      },
      include: [db.Tag],
    });

    res.status(200).json({
      status: "success",
      tagsOfQuestion,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};

const addTagToQuestion = async (req, res, next) => {
  try {
    await db.QuestionTag.bulkCreate(req.body);

    const newTagsInQuestion = await db.QuestionTag.findAll({
      where: {
        questionId: req.params.questionId,
      },
      include: [db.Tag],
    });

    res.status(201).json({
      status: "success",
      newTagsInQuestion,
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
      where: { questionId: req.body[0].questionId },
    });

    const updatedTagOfQuestion = await db.QuestionTag.bulkCreate(req.body);

    res.status(200).json({
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
  //ส่ง questionId มาเป็นอาเรย์ของ id ที่ต้องดารลบ
  try {
    await db.QuestionTag.destroy({
      where: {
        questionId: req.params.questionId,
        tagId: req.body.tagId,
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
  getTagsInQuestion,
  addTagToQuestion,
  updateTagOfQuestion,
  deleteTagOfQuestion,
};
