const db = require("../models");
const FilterObject = require("../utils/FilterObject");

const mapArrayOfObject = function (arrOfObj, id) {
  return arrOfObj.map((obj) => ({
    questionId: id,
    ...obj,
  }));
};

const createQuestionInExam = async (req, res, next) => {
  const newQuestion = await db.Question.create({
    questionType: req.body.questionType,
    question: req.body.question,
    level: req.body.level,
  });
  await db.QuestionExam.create({
    examId: req.params.examId,
    questionId: newQuestion.questionId,
  });

  let choice = mapArrayOfObject(req.body.choice, newQuestion.questionId);
  let tag = mapArrayOfObject(req.body.tag, newQuestion.questionId);
  let answer = mapArrayOfObject(req.body.answer, newQuestion.questionId);

  choice = await db.Choice.bulkCreate(choice);
  tag = await db.QuestionTag.bulkCreate(tag);
  answer = await db.Answer.bulkCreate(answer);

  res.status(201).json({
    status: "success",
    message: "สร้างคำถามเรียบร้อย",
    newQuestion,
    choice,
    tag,
    answer,
  });
};

const getAllQuestion = async (req, res, next) => {
  const allQuestion = await db.Question.findAll();

  res.status(200).json({
    status: "success",
    allQuestion,
  });
};

const getQuestion = async (req, res, next) => {
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

  if (!target) {
    res.status(404).json({
      status: "fail",
      message: "ไม่มีคำถามนี้ในระบบ",
    });
  }

  res.status(200).json({
    status: "success",
    target,
  });
};

const updateQuestionInExam = async (req, res, next) => {
  let editedFields = new FilterObject(req.body, req.body.allowedFields);
  const updatedQuestion = await db.Question.update(editedFields, {
    where: { questionId: req.params.questionId },
  });

  const updatedChoice = await db.Choice.update(
    { choice: req.body.choice.choice },
    {
      where: { choiceId: req.params.choiceId },
    }
  );
  const updatedTag = await db.QuestionTag.update(
    { tagId: req.body.tag.tagId },
    {
      where: { questionTagId: req.params.questionTagId },
    }
  );

  res.status(200).json({
    status: "success",
    message: "แก้ไขคำถามสำเร็จ",
    updatedQuestion,
    updatedChoice,
    updatedTag,
  });
};

const deleteQuestion = async (req, res, next) => {
  await db.Question.destroy({
    where: { questionId: req.params.questionId },
  });

  res.status(204).send();
};

module.exports = {
  createQuestionInExam,
  getAllQuestion,
  getQuestion,
  updateQuestionInExam,
  deleteQuestion,
};
