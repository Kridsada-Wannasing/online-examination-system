const db = require("../models");

const mapObjectInArray = (array, questionId) => {
  return array.map((obj) => ({ ...obj, questionId }));
};

const getTagsInQuestion = async (req, res, next) => {
  try {
    const tagsOfQuestion = await db.QuestionTag.findAll({
      where: {
        questionId: req.params.questionId,
        include: [db.Tag],
      },
    });

    res.status(400).json({
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
    const newTagsInQuestion = await db.QuestionTag.bulkCreate(
      mapObjectInArray(req.body, req.params.questionId)
    );

    res.status(400).json({
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
    await db.QuestionTag.destroy(req.params.questionId);

    const updatedTagOfQuestion = await db.QuestionTag.bulkCreate(
      mapObjectInArray(req.body, req.params.questionId)
    );

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
