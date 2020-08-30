const db = require("../models");
const FilterObject = require("../utils/FilterObject");

const createQuestion = async (req, res, next) => {
  try {
    const newQuestion = await db.Question.create({
      questionType: req.body.questionType,
      question: req.body.question,
      level: req.body.level,
    });
    await db.QuestionExam.create({
      examId: req.body.examId,
      questionId: newQuestion.questionId,
    });

    res.status(201).json({
      status: "success",
      message: "สร้างคำถามเรียบร้อย",
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
          model: db.Answer,
          required: false,
        },
        {
          model: db.QuestionTag,
          include: [db.Tag],
          required: false,
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
    let editedFields = new FilterObject(req.body, req.body.allowedFields);
    const updatedQuestion = await db.Question.update(editedFields, {
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
